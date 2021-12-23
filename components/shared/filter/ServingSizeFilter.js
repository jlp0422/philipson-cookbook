import Checkbox from '~/components/shared/form/Checkbox'

const ServingSizeFilter = ({ maxNumServings, setMaxNumServings }) => {
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
    console.log({ serves, maxNumServings })
    if (maxNumServings.includes(serves)) {
      setMaxNumServings(maxNumServings.filter(s => s !== serves))
    } else {
      setMaxNumServings(maxNumServings.concat(serves))
    }
  }

  const onSelectOnly = serves => {
    setMaxNumServings(serves)
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
          checked={!maxNumServings.length}
          onHandleCheck={() => onSelectOnly([])}
        />
        {options.map(({ max, label, id }) => (
          <Checkbox
            key={id}
            label={label}
            id={max}
            onHandleCheck={onHandleCheck}
            checked={maxNumServings.includes(max)}
            onSelectOnly={() => onSelectOnly([max])}
            onlyDisabled={
              maxNumServings.length === 1 && maxNumServings.includes(max)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ServingSizeFilter
