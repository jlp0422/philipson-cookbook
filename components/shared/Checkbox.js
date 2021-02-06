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
  modifier = 'small'
}) => {
  const size = SIZES[modifier]
  return (
    <label className='flex items-center mt-2 w-max' htmlFor={id}>
      <input
        checked={checked}
        value={id}
        id={id}
        type='checkbox'
        onChange={onHandleCheck}
        className={`${size} border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      />
      <span className='pl-1'>{label}</span>
      {onSelectOnly && (
        <button
          disabled={onlyDisabled}
          onClick={onSelectOnly}
          className='pl-2 text-sm disabled:text-gray-500 cursor disabled:cursor-default'
        >
          Only
        </button>
      )}
    </label>
  )
}

export default Checkbox
