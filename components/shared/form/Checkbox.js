const SIZES = {
  small: 'w-5 h-5',
  medium: 'w-8 h-8',
  large: 'w-12-h-12'
}

const Checkbox = ({
  label,
  id,
  onHandleCheck,
  checked,
  onSelectOnly = null,
  onlyDisabled,
  modifier = 'small',
  first
}) => {
  const size = SIZES[modifier]
  return (
    <label
      className={`flex items-center w-max ${first ? '' : 'mt-2'}`}
      htmlFor={id}
    >
      <input
        checked={checked}
        value={id}
        id={id}
        type='checkbox'
        onChange={onHandleCheck}
        className={`${size} border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      />
      <span className='ml-2'>{label}</span>
      {onSelectOnly && (
        <button
          disabled={onlyDisabled}
          onClick={onSelectOnly}
          className='ml-2 text-sm disabled:text-gray-500 cursor disabled:cursor-default'
        >
          Only
        </button>
      )}
    </label>
  )
}

export default Checkbox
