import { useState } from 'react'
import Head from 'components/Head'

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

const ingredientStructure = {
  amount: '',
  item: '',
  measurement: ''
}

const initialState = {
  author: '',
  title: '',
  description: '',
  ingredients: [{}],
  steps: [''],
  imageUrl: '',
  source: '',
  tags: [],
  notes: ''
}

const CreateRecipe = () => {
  const [formState, setFormState] = useState(initialState)

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
          <div className='grid grid-cols-3 gap-2'>
            <label className='block' htmlFor='amount'>
              <span className='text-gray-700'>Amount</span>
              <input
                type='number'
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                placeholder=''
                id='amount'
                name='amount'
              />
            </label>
            <label className='block' htmlFor='measurement'>
              <span className='text-gray-700'>Measurement</span>
              <select
                name='measurement'
                id='measurement'
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                defaultValue=''
              >
                <option disabled value=''>
                  Select...
                </option>
                {MEASUREMENTS.map(m => (
                  <option key={m} value='m'>
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
                id='item'
                name='item'
              />
            </label>
          </div>
        </label>

        <label className='block' htmlFor='steps'>
          <span className='text-gray-700'>Steps</span>
          {formState.steps.map((step, index) => (
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
      </div>
    </>
  )
}

export default CreateRecipe
