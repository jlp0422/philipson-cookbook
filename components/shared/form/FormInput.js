const FormInput = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  labelStyles = '',
  error = null,
  onClear
}) => {
  return (
    <label className={`block ${labelStyles}`} htmlFor={id}>
      {label ? <span className='text-lg text-gray-700'>{label}</span> : null}
      {error ? (
        <span className='block font-bold text-red-600'>{error.long}</span>
      ) : null}
      <input
        type={type}
        className='block w-full border-gray-300 rounded-md shadow-sm h-11 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={id}
        id={id}
      />
      {onClear && (
        <button
          onClick={onClear}
          disabled={!value.length}
          className='text-gray-600 font-semibold absolute top-2.5 right-2 px-1 bg-white disabled:text-gray-400'
        >
          <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
            <path
              fillRule='evenodd'
              d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
            />
          </svg>
        </button>
      )}
    </label>
  )
}

export default FormInput
