import Loading from '~/components/shared/Loading'

const RecipeFormPending = () => {
  return (
    <div className='flex flex-col items-center justify-center w-4/5 px-6 py-10 mx-auto mt-16 bg-blue-100 rounded-md sm:mt-12 md:w-3/5'>
      <h3 className='mb-8 text-2xl font-semibold text-center'>
        Creating your recipe...
      </h3>
      <Loading size='large' modifier='blue' />
    </div>
  )
}

export default RecipeFormPending
