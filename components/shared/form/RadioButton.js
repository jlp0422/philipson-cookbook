const SIZES = {
  small: 'w-5 h-5',
  medium: 'w-8 h-8',
  large: 'w-12-h-12'
}

const Radio = ({ label, id, onHandleCheck, checked, modifier = 'small' }) => {
  const size = SIZES[modifier]
  return (
    <label className='flex items-center mt-2 w-max' htmlFor={id}>
      <input
        checked={checked}
        value={id}
        id={id}
        type='radio'
        onChange={onHandleCheck}
        className={`${size} border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      />
      <span className='ml-2'>{label}</span>
    </label>
  )
}

export default Radio
