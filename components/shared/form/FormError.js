const FormError = ({ error, size }) => {
  return (
    <span className={`block mt-1 mb-2 font-bold text-red-600 leading-5 ${size}`}>
      {error.long}
    </span>
  )
}

export default FormError
