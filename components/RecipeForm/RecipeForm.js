import { useMutation } from '@apollo/client'
import Image from 'next/image'
import { useEffect, useReducer, useRef, useState } from 'react'
import Button from '~/components/shared/Button'
import FormArea from '~/components/shared/form/FormArea'
import FormError from '~/components/shared/form/FormError'
import FormInput from '~/components/shared/form/FormInput'
import Loading from '~/components/shared/Loading'
import CREATE_RECIPE from '~/graphql/mutations/createRecipe'
import NakedX from '~/icons/NakedX'
import Upload from '~/icons/Upload'
import { getImageMin } from '~/utils/helpers'
import {
  RESET_FORM,
  SUBMIT_ERROR,
  SUBMIT_SUCCESS,
  UPDATE_FIELD,
  UPDATE_STATUS
} from './actions'
import { initialState, MEASUREMENTS, STATUSES } from './constants'
import {
  formDataToQueryInput,
  getImageDivisor,
  isError,
  isPending,
  isSuccess
} from './helpers'
import RecipeFormError from './RecipeFormError'
import RecipeFormPending from './RecipeFormPending'
import RecipeFormSuccess from './RecipeFormSuccess'
import reducer from './reducer'
import recipeFormValidator from './validator'

const inputClass =
  'block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-11'

const RecipeForm = () => {
  const fileInputRef = useRef(null)
  const loadingRef = useRef(null)
  const [formState, dispatch] = useReducer(reducer, initialState)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [createRecipe, { data: newRecipe, error }] = useMutation(
    CREATE_RECIPE,
    {
      refetchQueries: ['Recipes'],
      onCompleted: () => dispatch({ type: SUBMIT_SUCCESS }),
      onError: () => dispatch({ type: SUBMIT_ERROR })
    }
  )

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView()
    }
  }, [loadingRef, isUploading])

  const renderIngredientMeasurements = () => (
    <>
      <option disabled value=''>
        Select...
      </option>
      {Object.keys(MEASUREMENTS).map(m => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </>
  )

  const updateField = (field, value) => {
    dispatch({
      type: UPDATE_FIELD,
      field,
      value
    })
  }

  const updateText = field => ev => {
    updateField(field, ev.target.value)
  }

  const onChangeStep = index => ev => {
    const stepsCopy = [...formState.steps]
    stepsCopy[index] = ev.target.value
    updateField('steps', stepsCopy)
  }

  const onChangeIngredient = (key, index) => ev => {
    const ingCopy = [...formState.ingredients]
    ingCopy[index][key] = ev.target.value
    updateField('ingredients', ingCopy)
  }

  const add = (stateKey, defaultValue) => {
    updateField(stateKey, [...formState[stateKey], defaultValue])
  }

  const remove = (stateKey, indexToRemove) => {
    const existing = formState[stateKey]
    const filtered = existing.filter((_, index) => indexToRemove !== index)
    updateField(stateKey, filtered)
  }

  const onImageUpload = () => {
    const [imageFile] = fileInputRef.current.files
    if (!imageFile) {
      return setUploadError('Please select an image.')
    }
    setUploadError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append('image', imageFile)

    fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })
      .then(async res => {
        setIsUploading(false)
        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(
            `Image upload error with status ${res.status}: ${
              error || res.statusText
            }. Please try again.`
          )
        }
        return res.json()
      })
      .then(data => {
        updateField('imageData', {
          filename: imageFile.name,
          url: data.secure_url,
          height: data.height,
          width: data.width,
          divisor: getImageDivisor({ height: data.height, width: data.width })
        })
      })
      .catch(err => setUploadError(err.message))
  }

  const onFormSubmit = ev => {
    ev.preventDefault()
    const formErrors = recipeFormValidator(formState)
    if (Object.keys(formErrors).length) {
      updateField('errors', formErrors)
      window.scrollTo(0, 0)
    } else {
      dispatch({ type: UPDATE_STATUS, status: STATUSES.PENDING })
      createRecipe({
        variables: { recipeInput: formDataToQueryInput(formState) }
      })
    }
  }

  const renderError = key => {
    if (formState.errors[key]) {
      return <FormError error={formState.errors[key]} />
    }
    return null
  }

  const addAnotherButton = (key, defaultValue) => (
    <Button
      className='ml-4 text-sm'
      color='green'
      onClick={() => add(key, defaultValue)}
    >
      Add
    </Button>
  )

  const xButton = (key, index) => (
    <Button
      className='text-sm'
      size='small'
      color='red'
      onClick={() => remove(key, index)}
      disabled={!index}
    >
      <span>
        <NakedX />
      </span>
    </Button>
  )

  const resetForm = () => dispatch({ type: RESET_FORM })
  const setStatusIdle = () =>
    dispatch({ type: UPDATE_STATUS, status: STATUSES.IDLE })

  if (isSuccess(formState.status)) {
    return (
      <RecipeFormSuccess onCreateAnother={resetForm} newRecipe={newRecipe} />
    )
  }

  if (isError(formState.status)) {
    return <RecipeFormError onCloseError={setStatusIdle} error={error} />
  }

  if (isPending(formState.status)) {
    return <RecipeFormPending />
  }

  return (
    <form className='mx-auto mt-4 prose' onSubmit={onFormSubmit}>
      <FormInput
        label='Author'
        id='author'
        value={formState.author}
        onChange={updateText('author')}
        labelStyles='mb-4'
        error={formState.errors['author']}
      />
      <FormInput
        label='Title'
        id='title'
        value={formState.title}
        onChange={updateText('title')}
        labelStyles='mb-4'
        error={formState.errors['title']}
      />
      <FormArea
        label='Description'
        id='description'
        value={formState.description}
        onChange={updateText('description')}
        rows='3'
        style={{ height: 70 }}
        labelStyles='mb-4'
      />
      <label className='block mb-4' htmlFor='ingredients'>
        <div>
          <span className='text-lg text-gray-700'>Ingredients</span>
          {addAnotherButton('ingredients', {
            amount: '',
            item: '',
            measurement: ''
          })}
        </div>
        {renderError('ingredients')}
        {formState.ingredients.map((ing, index) => (
          <div
            className='items-center mt-2 grid gap-3'
            key={index}
            style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr)) 35px' }}
          >
            <FormInput
              id='amount'
              value={ing.amount}
              onChange={onChangeIngredient('amount', index)}
              type='number'
              placeholder='Amount'
            />
            <label className='block' htmlFor='measurement'>
              <select
                name='measurement'
                id='measurement'
                className={inputClass}
                value={ing.measurement}
                onChange={onChangeIngredient('measurement', index)}
              >
                {renderIngredientMeasurements()}
              </select>
            </label>
            <FormInput
              id='item'
              value={ing.item}
              onChange={onChangeIngredient('item', index)}
              placeholder='Item'
            />
            {xButton('ingredients', index)}
          </div>
        ))}
      </label>
      <label className='block mb-4' htmlFor='steps'>
        <div>
          <span className='text-lg text-gray-700'>Steps</span>
          {addAnotherButton('steps', '')}
        </div>
        {renderError('steps')}
        {formState.steps.map((step, index) => (
          <div
            className='items-center mt-2 grid gap-3'
            key={index}
            style={{ gridTemplateColumns: 'minmax(0, 1fr) 35px' }}
          >
            <textarea
              className={inputClass}
              placeholder=''
              rows='3'
              value={step}
              style={{ height: 44 }}
              onChange={onChangeStep(index)}
              key={index}
              id={`step-${index}`}
              name={`step-${index}`}
            />
            {xButton('steps', index)}
          </div>
        ))}
      </label>
      <FormInput
        label='Total Time'
        placeholder='Time in minutes'
        id='time'
        type='number'
        value={formState.totalTime}
        onChange={updateText('totalTime')}
        labelStyles='mb-4'
        error={formState.errors['totalTime']}
      />
      <FormInput
        label='Servings'
        id='servings'
        type='number'
        value={formState.servings}
        onChange={updateText('servings')}
        labelStyles='mb-4'
        error={formState.errors['servings']}
      />
      <FormInput
        label='Source'
        id='source'
        value={formState.source}
        onChange={updateText('source')}
        labelStyles='mb-4'
      />
      <FormArea
        label='Notes'
        id='notes'
        value={formState.notes}
        onChange={updateText('notes')}
        rows='3'
        style={{ height: 70 }}
        labelStyles='mb-4'
      />
      <label className='block mb-4' htmlFor='imageUrl'>
        <span className='text-lg text-gray-700'>Image</span>
        {uploadError && <FormError error={{ long: uploadError }} />}
        <div className='flex'>
          <div className='block flex-1 bg-white p-0.5 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            <input
              ref={fileInputRef}
              type='file'
              className='w-full p-1'
              id='imageUrl'
              name='imageUrl'
            />
          </div>
          <Button
            className='flex items-center ml-4 text-sm'
            color='blue'
            disabled={isUploading}
            onClick={onImageUpload}
          >
            <span className='hidden mr-2 sm:inline-block'>Upload</span>
            <span className='inline-block w-4 h-4'>
              <Upload />
            </span>
          </Button>
        </div>
      </label>
      {(isUploading || formState.imageData.url) && (
        <div className='my-4'>
          <span className='text-lg'>Image Preview</span>
          {isUploading && (
            <div ref={loadingRef}>
              <Loading />
            </div>
          )}
          {!isUploading && !uploadError && formState.imageData.url && (
            <div className='flex items-center justify-center max-w-96'>
              <Image
                className='rounded'
                src={formState.imageData.url}
                alt={formState.imageData.filename}
                title={formState.imageData.filename}
                width={getImageMin(formState.imageData, 'width')}
                height={getImageMin(formState.imageData, 'height')}
              />
            </div>
          )}
        </div>
      )}
      <Button className='h-11' type='submit' color='green'>
        Create Recipe
      </Button>
    </form>
  )
}

export default RecipeForm
