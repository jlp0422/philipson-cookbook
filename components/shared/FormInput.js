const FormInput = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder = ''
}) => {
  return (
    <label className='block' htmlFor={id}>
      <span className='text-gray-700'>{label}</span>
      <input
        type={type}
        className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={id}
        id={id}
      />
    </label>
  )
}

export default FormInput
