import { useState } from 'react'
import Image from 'next/image'
import { createRecipe } from '@/graphql/api'
import { getImageDivisor } from '@/utils/helpers'
import FormInput from '@/components/shared/FormInput'
import FormArea from '@/components/shared/FormArea'

const MEASUREMENTS = [
  'PINCH',
  'TEASPOON',
  'TABLESPOON',
  'OUNCE',
  'POUND',
  'CUP',
  'PINT',
  'QUART',
  'GALLON',
  'ML'
]

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
  notes: ''
}

const inputClass =
  'block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'

const RecipeForm = () => {
  const [formState, setFormState] = useState(initialState)
  const [isUploading, setIsUploading] = useState(false)

  const validateForm = formData => {
    const formErrors = []
    if (!formData.author) {
      formErrors.push({
        short: 'Author missing',
        long: 'Please add a recipe author.'
      })
    }
    if (!formData.title) {
      formErrors.push({
        short: 'Title missing',
        long: 'Please add a recipe title.'
      })
    }
    formData.ingredients.forEach(ing => {
      if (!ing.amount || !ing.measurement || !ing.item) {
        formErrors.push({
          short: 'Ingredient incorrect',
          long: 'Please ensure you have added all ingredient information.'
        })
      }
    })

    return formErrors
  }

  const renderIngredientMeasurements = () => (
    <>
      <option disabled value=''>
        Select...
      </option>
      {MEASUREMENTS.map(m => (
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
    setIsUploading(true)
    const { files } = document.querySelector('input[type="file"]')
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
    console.log({ formErrors })
    if (!formErrors.length) {
      const data = await createRecipe(formState)
      console.log({ data })
    }
  }

  return (
    <form className='mx-auto max-w-prose' onSubmit={onFormSubmit}>
      <FormInput
        label='Author'
        id='author'
        value={formState.author}
        onChange={onFormChange('author')}
      />
      <FormInput
        label='Title'
        id='title'
        value={formState.title}
        onChange={onFormChange('title')}
      />
      <FormArea
        label='Description'
        id='description'
        value={formState.description}
        onChange={onFormChange('description')}
        rows='3'
        style={{ height: 70 }}
      />
      <label className='block' htmlFor='ingredients'>
        <span className='text-gray-700'>Ingredients</span>
        {formState.ingredients.map((ing, index) => (
          <div className='grid grid-cols-4 gap-2' key={index}>
            <FormInput
              label='Amount'
              id='amount'
              value={ing.amount}
              onChange={onChangeIngredient('amount', index)}
              type='number'
            />
            <label className='block' htmlFor='measurement'>
              <span className='text-gray-700'>Measurement</span>
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
              label='Item'
              id='item'
              value={ing.item}
              onChange={onChangeIngredient('item', index)}
            />
            {index > 0 && (
              <button
                onClick={() => remove('ingredients', index)}
                type='button'
              >
                remove ingredient
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={() =>
            add('ingredients', { amount: '', item: '', measurement: '' })
          }
        >
          add ingredient
        </button>
      </label>
      <label className='block' htmlFor='steps'>
        <span className='text-gray-700'>Steps</span>
        {formState.steps.map((step, index) => (
          <div key={index} className='flex'>
            <textarea
              className={inputClass}
              placeholder=''
              rows='3'
              value={step}
              style={{ height: 50 }}
              onChange={onChangeStep(index)}
              key={index}
              id={`step-${index}`}
              name={`step-${index}`}
            />
            {index > 0 && (
              <button type='button' onClick={() => remove('steps', index)}>
                remove step
              </button>
            )}
          </div>
        ))}
        <button type='button' onClick={() => add('steps', '')}>
          add step
        </button>
      </label>
      <FormInput
        label='Source'
        id='source'
        value={formState.source}
        onChange={onFormChange('source')}
      />
      <FormArea
        label='Notes'
        id='notes'
        value={formState.notes}
        onChange={onFormChange('notes')}
        rows='3'
        style={{ height: 70 }}
      />
      <label className='block' htmlFor='imageUrl'>
        <span className='text-gray-700'>Source</span>
        <div className='flex'>
          <input
            type='file'
            className={inputClass}
            id='imageUrl'
            name='imageUrl'
          />
          <button type='button' onClick={onImageUpload}>
            Upload
          </button>
        </div>
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
      </label>
      <button type='submit'>create!</button>
    </form>
  )
}

export default RecipeForm
