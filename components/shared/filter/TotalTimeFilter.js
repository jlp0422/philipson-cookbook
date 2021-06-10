import { useState } from 'react'
import RadioButton from '~/components/shared/form/RadioButton'
import RotatingArrow from '~/components/shared/RotatingArrow'

const TotalTimeFilter = ({ maxTotalTime, setMaxTotalTime }) => {
  const [showTimeOptions, setShowTimeOptions] = useState(false)
  const options = [
    { max: 0, label: 'Any', id: 'any', checked: !maxTotalTime },
    {
      max: 30,
      label: '30 mins or less',
      id: '30-mins-or-less',
      checked: maxTotalTime === 30
    },
    {
      max: 60,
      label: '60 mins or less',
      id: '60-mins-or-less',
      checked: maxTotalTime === 60
    },
    {
      max: 90,
      label: '90 mins or less',
      id: '90-mins-or-less',
      checked: maxTotalTime === 90
    },
  ]

  return (
    <div className='p-4 mt-4 bg-white rounded'>
      <button
        onClick={() => setShowTimeOptions(!showTimeOptions)}
        className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'
      >
        <span>Total Time</span>
        <RotatingArrow flip={showTimeOptions} />
      </button>
      <div
        className='p-2 mt-2 overflow-scroll border border-gray-300 border-solid rounded shadow-inner max-h-40'
        style={{
          transformOrigin: 'top center',
          ...(showTimeOptions ? { display: 'block' } : { display: 'none' })
        }}
      >
        {options.map(({ max, label, id, checked }, index) => (
          <RadioButton
            key={id}
            first={!index}
            label={label}
            id={id}
            checked={checked}
            onHandleCheck={() => setMaxTotalTime(max)}
          />
        ))}
      </div>
    </div>
  )
}

export default TotalTimeFilter
