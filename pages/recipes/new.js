import { useState } from 'react'
import Head from 'components/Head'
import Image from 'next/image'

const getImageDivisor = ({ height, width }) => {
  const max = height > width ? height : width
  return max / 300
}

const MEASUREMENTS = [
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

const CreateRecipe = () => {
  const [formState, setFormState] = useState(initialState)
  const [isUploading, setIsUploading] = useState(false)

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

  const addStep = () => {
    setFormState({
      ...formState,
      steps: [...formState.steps, '']
    })
  }

  const removeStep = indexToRemove => {
    const newSteps = formState.steps.filter(
      (_, index) => indexToRemove !== index
    )
    setFormState({
      ...formState,
      steps: newSteps
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

  const addIngredient = () => {
    setFormState({
      ...formState,
      ingredients: [
        ...formState.ingredients,
        {
          amount: '',
          item: '',
          measurement: ''
        }
      ]
    })
  }

  const removeIngredient = indexToRemove => {
    const newIngredients = formState.ingredients.filter(
      (_, index) => indexToRemove !== index
    )
    setFormState({
      ...formState,
      ingredients: newIngredients
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

  console.log({ formState })

  return (
    <>
      <Head title='New Recipe | Philipson Cookbook' />
      <h2>create new recipe</h2>
      <div className='mx-auto max-w-prose'>
        <label className='block' htmlFor='author'>
          <span className='text-gray-700'>Author</span>
          <input
            type='text'
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder=''
            value={formState.author}
            onChange={onFormChange('author')}
            required
            name='author'
            id='author'
          />
        </label>
        <label className='block' htmlFor='title'>
          <span className='text-gray-700'>Title</span>
          <input
            type='text'
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder=''
            value={formState.title}
            onChange={onFormChange('title')}
            required
            id='title'
            name='title'
          />
        </label>
        <label className='block' htmlFor='description'>
          <span className='text-gray-700'>Description</span>
          <textarea
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder=''
            value={formState.description}
            rows='3'
            style={{ height: 70 }}
            onChange={onFormChange('description')}
            name='description'
            id='description'
          />
        </label>
        <label className='block' htmlFor='ingredients'>
          <span className='text-gray-700'>Ingredients</span>
          {formState.ingredients.map((ing, index) => (
            <div className='grid grid-cols-4 gap-2' key={index}>
              <label className='block' htmlFor='amount'>
                <span className='text-gray-700'>Amount</span>
                <input
                  type='number'
                  className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder=''
                  value={ing.amount}
                  id='amount'
                  name='amount'
                  onChange={onChangeIngredient('amount', index)}
                />
              </label>
              <label className='block' htmlFor='measurement'>
                <span className='text-gray-700'>Measurement</span>
                <select
                  name='measurement'
                  id='measurement'
                  className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={ing.measurement}
                  onChange={onChangeIngredient('measurement', index)}
                >
                  <option disabled value=''>
                    Select...
                  </option>
                  {MEASUREMENTS.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className='block' htmlFor='item'>
                <span className='text-gray-700'>Item</span>
                <input
                  type='text'
                  className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder=''
                  value={ing.item}
                  onChange={onChangeIngredient('item', index)}
                  id='item'
                  name='item'
                />
              </label>
              {index > 0 && (
                <button onClick={() => removeIngredient(index)}>
                  remove ingredient
                </button>
              )}
            </div>
          ))}
          <button onClick={addIngredient}>add ingredient</button>
        </label>
        <label className='block' htmlFor='steps'>
          <span className='text-gray-700'>Steps</span>
          {formState.steps.map((step, index) => (
            <div key={index} className='flex'>
              <textarea
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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
                <button onClick={() => removeStep(index)}>remove step</button>
              )}
            </div>
          ))}
          <button onClick={addStep}>add step</button>
        </label>
        <label className='block' htmlFor='source'>
          <span className='text-gray-700'>Source</span>
          <input
            type='text'
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder=''
            value={formState.source}
            onChange={onFormChange('source')}
            id='source'
            name='source'
          />
        </label>
        <label className='block' htmlFor='notes'>
          <span className='text-gray-700'>Notes</span>
          <textarea
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder=''
            value={formState.notes}
            rows='3'
            style={{ height: 70 }}
            onChange={onFormChange('notes')}
            id='notes'
            name='notes'
          />
        </label>
        <label className='block' htmlFor='imageUrl'>
          <span className='text-gray-700'>Source</span>
          <div className='flex'>
            <input
              type='file'
              className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              id='imageUrl'
              name='imageUrl'
            />
            <button onClick={onImageUpload}>Upload</button>
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
      </div>
    </>
  )
}

export default CreateRecipe
