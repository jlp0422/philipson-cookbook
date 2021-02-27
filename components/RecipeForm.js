import FormArea from '@/components/shared/form/FormArea'
import FormInput from '@/components/shared/form/FormInput'
import CREATE_RECIPE from '@/graphql/mutations/createRecipe'
import Button from '@/components/shared/Button'
import { formDataToQueryInput, getImageDivisor } from '@/utils/helpers'
import { useMutation } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'

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
  'block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-11'

const RecipeForm = () => {
  const [formState, setFormState] = useState(initialState)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [createRecipe, { data, loading, error }] = useMutation(CREATE_RECIPE)

  const validateForm = formData => {
    const formErrors = {}
    if (!formData.author) {
      formErrors['author'] = {
        short: 'Author missing',
        long: 'Please add a recipe author.'
      }
    }
    if (!formData.title) {
      formErrors['title'] = {
        short: 'Title missing',
        long: 'Please add a recipe title.'
      }
    }
    if (formData.steps.every(step => !step.trim().length)) {
      formErrors['steps'] = {
        short: 'Steps missing',
        long: 'Please add at least one step for the recipe.'
      }
    }
    formData.ingredients.forEach(ing => {
      if (!ing.amount || !ing.measurement || !ing.item) {
        formErrors['ingredients'] = {
          short: 'Ingredient incorrect',
          long: 'Please ensure you have added all ingredient information.'
        }
      }
    })

    return formErrors
  }

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
      setUploadError('Please select a file')
      return
    }
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'philipson-cookbook')

    const data = await fetch(
      'https://api.Cloudinary.com/v1_1/jlp0422/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )
      .then(res => {
        setIsUploading(false)
        return res.json()
      })
      .catch(err => {
        setIsUploading(false)
        console.error(err)
      })

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

  const onFormSubmit = async ev => {
    ev.preventDefault()
    const formErrors = validateForm(formState)
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
    if (formState.errors[key]) {
      return (
        <span className='block font-bold text-red-600'>
          {formState.errors[key].long}
        </span>
      )
    }
    return null
  }

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
        <div className=''>
          <span className='text-lg text-gray-700'>Ingredients</span>
          <Button
            className='ml-4 text-sm'
            color='green'
            onClick={() =>
              add('ingredients', { amount: '', item: '', measurement: '' })
            }
          >
            Add
          </Button>
        </div>
        {renderError('ingredients')}
        {formState.ingredients.map((ing, index) => {
          return (
            <div
              className='grid items-baseline gap-3 space-y-2'
              key={index}
              style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr)) 40px' }}
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
              <Button
                className='text-sm h-11'
                size='small'
                color='red'
                onClick={() => remove('ingredients', index)}
                disabled={!index}
              >
                X
              </Button>
            </div>
          )
        })}
      </label>
      <label className='block mb-4' htmlFor='steps'>
        <div className=''>
          <span className='text-lg text-gray-700'>Steps</span>
          <Button
            className='ml-4 text-sm'
            color='green'
            onClick={() => add('steps', '')}
          >
            Add
          </Button>
        </div>
        {renderError('steps')}
        {formState.steps.map((step, index) => {
          return (
            <div
              className='grid items-baseline gap-3 space-y-2'
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
              <Button
                className='text-sm h-11'
                size='small'
                color='red'
                onClick={() => remove('steps', index)}
                disabled={!index}
              >
                X
              </Button>
            </div>
          )
        })}
      </label>
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
          <input
            type='file'
            className='items-center block w-full p-1 mt-1 bg-white rounded'
            id='imageUrl'
            name='imageUrl'
          />
          <Button
            className='self-end ml-2 h-11'
            color='blue'
            disabled={isUploading}
            onClick={onImageUpload}
          >
            Upload
          </Button>
        </div>
      </label>
      <h3>is uploading? {isUploading.toString()}</h3>
      {formState.imageData.url && (
        <Image
          src={formState.imageData.url}
          alt={formState.imageData.filename}
          title={formState.imageData.filename}
          width={Math.min(
            formState.imageData.width / formState.imageData.divisor
          )}
          height={Math.min(
            formState.imageData.height / formState.imageData.divisor
          )}
        />
      )}
      <Button className='h-11' type='submit' color='green'>
        Create Recipe
      </Button>
    </form>
  )
}

export default RecipeForm
