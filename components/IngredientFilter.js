import RadioButton from './shared/form/RadioButton'
import { useState } from 'react'

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

  const ingCopy = showIng ? (
    <button onClick={() => setShowIng(!showIng)}>&#8593;</button>
  ) : (
    <button onClick={() => setShowIng(!showIng)}>&#8595;</button>
  )

  return (
    <div className='mt-4'>
      <h3 className='text-xl sm:text-2xl'>Ingredients {ingCopy}</h3>
      <div
        style={showIng ? { display: 'block' } : { display: 'none' }}
      >
        {options.map(({ max, label, id, checked }) => (
          <RadioButton
            key={id}
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
