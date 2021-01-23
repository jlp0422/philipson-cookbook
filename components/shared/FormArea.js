const FormArea = ({
  label,
  id,
  value,
  onChange,
  rows,
  placeholder = '',
  style = {},
  labelStyles = ""
}) => {
  return (
    <label className={`block ${labelStyles}`} htmlFor={id}>
      <span className='text-lg text-gray-700'>{label}</span>
      <textarea
        className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        placeholder={placeholder}
        value={value}
        rows={rows}
        style={style}
        onChange={onChange}
        name={id}
        id={id}
      />
    </label>
  )
}

export default FormArea
