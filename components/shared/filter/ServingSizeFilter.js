import Checkbox from '~/components/shared/form/Checkbox'

const ServingSizeFilter = ({ selectedServings, setSelectedServings }) => {
  const servingOptions = [
    { value: 4, label: 'Just us two' },
    { value: 8, label: 'Family friendly' },
    { value: 12, label: 'Party size' }
  ]
  const options = servingOptions.map(({ label, value }) => ({
    max: value,
    label,
    id: `serves-${value}`
  }))

  const onHandleCheck = ev => {
    const serves = +ev.target.value
    console.log({ serves, selectedServings })
    if (selectedServings.includes(serves)) {
      setSelectedServings(selectedServings.filter(s => s !== serves))
    } else {
      setSelectedServings(selectedServings.concat(serves))
    }
  }

  const onSelectOnly = serves => {
    setSelectedServings(serves)
  }

  return (
    <div className='p-4 mt-4 bg-white rounded'>
      <h3 className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'>
        Total Servings
      </h3>
      <div className='block p-2 mt-2' style={{ transformOrigin: 'top center' }}>
        <Checkbox
          label='All'
          id='all'
          first
          checked={!selectedServings.length}
          onHandleCheck={() => onSelectOnly([])}
        />
        {options.map(({ max, label, id }) => (
          <Checkbox
            key={id}
            label={label}
            id={max}
            onHandleCheck={onHandleCheck}
            checked={selectedServings.includes(max)}
            onSelectOnly={() => onSelectOnly([max])}
            onlyDisabled={
              selectedServings.length === 1 && selectedServings.includes(max)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ServingSizeFilter
