const Checkbox = ({
  label,
  id,
  onHandleCheck,
  checked,
  onSelectOnly = null,
  onlyDisabled
}) => {
  return (
    <label className='flex items-center mt-2' htmlFor={id}>
      <input
        checked={checked}
        value={id}
        id={id}
        type='checkbox'
        onChange={onHandleCheck}
        className='w-5 h-5 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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
