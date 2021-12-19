import Button from '~/components/shared/Button'

const RecipeFormError = ({ onCloseError, error }) => {
  return (
    <div className='flex flex-col items-center justify-center w-4/5 px-6 py-10 mx-auto mt-16 bg-red-100 rounded-md sm:mt-12 md:w-3/5'>
      <h3 className='text-2xl font-semibold text-center'>
        Something went wrong. Please try again!
      </h3>
      <p
        className='max-w-full my-6 overflow-hidden'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: '5',
          WebkitBoxOrient: 'vertical'
        }}
      >
        <span className='font-semibold'>Error message:</span> {error.message}
      </p>
      <Button onClick={onCloseError} className='p-4' color='green'>
        Back to recipe
      </Button>
    </div>
  )
}

export default RecipeFormError
