const FormError = ({ error }) => {
  return (
    <span className='block mt-1 mb-2 font-bold text-red-600 leading-5'>
      {error.long}
    </span>
  )
}

export default FormError
