// import { useState } from 'react'
import RadioButton from '~/components/shared/form/RadioButton'

const TotalTimeFilter = ({ maxTotalTime, setMaxTotalTime }) => {
  // const [showTimeOptions, setShowTimeOptions] = useState(false)
  const timeOptions = [30, 60, 90]
  const options = [
    { max: 0, label: 'Any', id: 'any-mins-or-less', checked: !maxTotalTime },
    ...timeOptions.map(time => ({
      max: time,
      label: `${time} mins`,
      id: `${time}-mins-or-less`,
      checked: maxTotalTime === time
    }))
  ]

  return (
    <div className='p-4 mt-4 bg-white rounded'>
      <h3 className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'>
        Total Time
      </h3>
      <div className='block p-2 mt-2' style={{ transformOrigin: 'top center' }}>
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
