const FormError = ({ error }) => {
  return (
    <span className='block mt-1 mb-2 font-bold leading-5 text-red-600'>
      {error.long}
    </span>
  )
}

export default FormError
