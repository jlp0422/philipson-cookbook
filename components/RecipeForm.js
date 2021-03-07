import FormArea from '@/components/shared/form/FormArea'
import FormInput from '@/components/shared/form/FormInput'
import CREATE_RECIPE from '@/graphql/mutations/createRecipe'
import FormError from '@/components/shared/form/FormError'
import Button from '@/components/shared/Button'
import {
  formDataToQueryInput,
  getImageDivisor,
  getImageMin
} from '@/utils/helpers'
import recipeFormValidator from '@/utils/recipeFormValidator'
import { useMutation } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import NakedX from '@/icons/NakedX'
import Upload from '@/icons/Upload'

const CLOUDINARY_UPLOAD_URL =
  'https://api.Cloudinary.com/v1_1/jlp0422/image/upload'

const MEASUREMENTS = {
  CUP: 'CUP',
  EACH: 'EACH',
  GALLON: 'GAL',
  GRAM: 'GRAM',
  'FLUID OUNCE': 'FL OZ',
  KILOGRAM: 'KG',
  LITER: 'LITER',
  MILLILITER: 'ML',
  OUNCE: 'OZ',
  PACKAGE: 'PKG',
  PINCH: 'PINCH',
  PINT: 'PINT',
  POUND: 'LB',
  QUART: 'QT',
  TABLESPOON: 'TBSP',
  TEASPOON: 'TSP'
}

const initialState = {
  author: '',
  title: '',
  description: '',
  totalTime: '',
  servings: '',
  ingredients: [
    {
      amount: '',
      item: '',
      measurement: ''
    }
  ],
  steps: [''],
  imageData: {},
  source: '',
  tags: [],
  notes: '',
  errors: {}
}

const inputClass =
  'block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-11'

const RecipeForm = () => {
  const [formState, setFormState] = useState(initialState)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [createRecipe, { data, loading, error }] = useMutation(CREATE_RECIPE)

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

  const onFormChange = key => ev => {
    setFormState({
      ...formState,
      [key]: ev.target.value
    })
  }

  const onChangeStep = index => ev => {
    const stepsCopy = [...formState.steps]
    stepsCopy[index] = ev.target.value
    setFormState({
      ...formState,
      steps: stepsCopy
    })
  }

  const onChangeIngredient = (key, index) => ev => {
    const ingCopy = [...formState.ingredients]
    ingCopy[index][key] = ev.target.value
    setFormState({
      ...formState,
      ingredients: ingCopy
    })
  }

  const add = (stateKey, defaultValue) => {
    setFormState({
      ...formState,
      [stateKey]: [...formState[stateKey], defaultValue]
    })
  }

  const remove = (stateKey, indexToRemove) => {
    const existing = formState[stateKey]
    const filtered = existing.filter((_, index) => indexToRemove !== index)
    setFormState({
      ...formState,
      [stateKey]: filtered
    })
  }

  const onImageUpload = async () => {
    const { files } = document.querySelector('input[type="file"]')
    if (!files.length) {
      return setUploadError('Please select a file')
    }
    setUploadError(null)
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'philipson-cookbook')

    const data = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        setIsUploading(false)
        if (!res.ok) {
          throw new Error(
            `Image upload error with status ${res.status}: ${res.statusText}. Please try again.`
          )
        }
        return res.json()
      })
      .catch(err => setUploadError(err.message))

    if (data) {
      setFormState({
        ...formState,
        imageData: {
          url: data.secure_url,
          height: data.height,
          width: data.width,
          filename: data.original_filename,
          divisor: getImageDivisor({ height: data.height, width: data.width })
        }
      })
    }
  }

  const onFormSubmit = ev => {
    ev.preventDefault()
    const formErrors = recipeFormValidator(formState)
    if (Object.keys(formErrors).length) {
      setFormState({
        ...formState,
        errors: formErrors
      })
      window.scrollTo(0, 0)
    } else {
      console.log('creating recipe...', formState)
      // createRecipe({
      //   variables: { recipeInput: formDataToQueryInput(formState) }
      // })
    }
  }

  const renderError = key => {
    return formState.errors[key] ? (
      <FormError error={formState.errors[key]} />
    ) : null
  }

  const addAnotherButton = (key, defaultValue) => (
    <Button
      className='ml-4 text-sm'
      color='green'
      onClick={() => add(key, defaultValue)}
    >
      Add Another
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

  console.log({ formState })

  return (
    <form className='mx-auto mt-4 prose' onSubmit={onFormSubmit}>
      <FormInput
        label='Author'
        id='author'
        value={formState.author}
        onChange={onFormChange('author')}
        labelStyles='mb-4'
        error={formState.errors['author']}
      />
      <FormInput
        label='Title'
        id='title'
        value={formState.title}
        onChange={onFormChange('title')}
        labelStyles='mb-4'
        error={formState.errors['title']}
      />
      <FormArea
        label='Description'
        id='description'
        value={formState.description}
        onChange={onFormChange('description')}
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
            className='grid items-center gap-3 mt-2'
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
            className='grid items-center gap-3 mt-2'
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
        onChange={onFormChange('totalTime')}
        labelStyles='mb-4'
        error={formState.errors['totalTime']}
      />
      <FormInput
        label='Servings'
        id='servings'
        type='number'
        value={formState.servings}
        onChange={onFormChange('servings')}
        labelStyles='mb-4'
        error={formState.errors['servings']}
      />
      <FormInput
        label='Source'
        id='source'
        value={formState.source}
        onChange={onFormChange('source')}
        labelStyles='mb-4'
      />
      <FormArea
        label='Notes'
        id='notes'
        value={formState.notes}
        onChange={onFormChange('notes')}
        rows='3'
        style={{ height: 70 }}
        labelStyles='mb-4'
      />
      <label className='block mb-4' htmlFor='imageUrl'>
        <span className='text-lg text-gray-700'>Image</span>
        {uploadError && (
          <span className='block my-1 font-bold text-red-600'>
            {uploadError}
          </span>
        )}
        <div className='flex'>
          <div className='block flex-1 bg-white p-0.5 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            <input
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
            <div className='block mx-auto text-center'>is uploading</div>
          )}
          {!isUploading && !uploadError && formState.imageData.url && (
            <div className='flex items-center justify-center max-w-96'>
              <Image
                src={formState.imageData.url}
                alt={formState.imageData.filename}
                title={formState.imageData.filename}
                className='rounded'
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
