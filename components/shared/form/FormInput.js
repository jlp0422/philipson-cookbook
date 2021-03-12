import FormError from '~/components/shared/form/FormError'
import CircledXIcon from '~/icons/CircledX'

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
      {error ? <FormError error={error} /> : null}
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
          className='text-gray-600 font-semibold absolute top-1.5 right-2 px-1 bg-white disabled:text-gray-400 h-8 w-8'
        >
          <CircledXIcon />
        </button>
      )}
    </label>
  )
}

export default FormInput
