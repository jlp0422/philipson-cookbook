import RadioButton from './shared/form/RadioButton'
import { useState } from 'react'
import RotatingArrow from './shared/RotatingArrow'

const IngredientFilter = ({ maxNumIngredients, setMaxNumIngredients }) => {
  const [showIng, setShowIng] = useState(false)
  const options = [
    { max: 0, label: 'Any', id: 'any', checked: !maxNumIngredients },
    {
      max: 5,
      label: '5 or less',
      id: '5-or-less',
      checked: maxNumIngredients === 5
    },
    {
      max: 10,
      label: '10 or less',
      id: '10-or-less',
      checked: maxNumIngredients === 10
    }
  ]

  return (
    <div className='p-4 mt-4 bg-white rounded'>
      <button
        onClick={() => setShowIng(!showIng)}
        className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'
      >
        <span>Ingredients</span>
        <RotatingArrow flip={showIng} />
      </button>
      <div
        className='p-2 mt-2 overflow-scroll border border-gray-300 border-solid rounded shadow-inner max-h-32'
        style={{
          transformOrigin: 'top center',
          ...(showIng ? { display: 'block' } : { display: 'none' })
        }}
      >
        {options.map(({ max, label, id, checked }, index) => (
          <RadioButton
            key={id}
            first={!index}
            label={label}
            id={id}
            checked={checked}
            onHandleCheck={() => setMaxNumIngredients(max)}
          />
        ))}
      </div>
    </div>
  )
}

export default IngredientFilter
