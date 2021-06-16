import { useState } from 'react'
import RadioButton from '~/components/shared/form/RadioButton'
import RotatingArrow from '~/components/shared/RotatingArrow'

const ServingSizeFilter = ({ maxNumServings, setMaxNumServings }) => {
  const [showServingOptions, setShowServingOptions] = useState(false)
  const servingOptions = [4, 6, 8]
  const options = [
    { max: 0, label: 'Any', id: 'any', checked: !maxNumServings },
    ...servingOptions.map(servingSize => ({
      max: servingSize,
      label: `${servingSize} servings or less`,
      id: `${servingSize}-servings-or-less`,
      checked: maxNumServings === servingSize
    }))
  ]

  return (
    <div className='p-4 mt-4 bg-white rounded'>
      <button
        onClick={() => setShowServingOptions(!showServingOptions)}
        className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'
      >
        <span>Total Servings</span>
        <RotatingArrow flip={showServingOptions} />
      </button>
      <div
        className='p-2 mt-2 overflow-scroll border border-gray-300 border-solid rounded shadow-inner max-h-40'
        style={{
          transformOrigin: 'top center',
          ...(showServingOptions ? { display: 'block' } : { display: 'none' })
        }}
      >
        {options.map(({ max, label, id, checked }, index) => (
          <RadioButton
            key={id}
            first={!index}
            label={label}
            id={id}
            checked={checked}
            onHandleCheck={() => setMaxNumServings(max)}
          />
        ))}
      </div>
    </div>
  )
}

export default ServingSizeFilter
