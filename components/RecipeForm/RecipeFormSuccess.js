import Link from 'next/link'

const RecipeFormSuccess = ({ newRecipe, onCreateAnother }) => {
  return (
    <div className='flex flex-col items-center justify-center w-4/5 px-6 py-10 mx-auto bg-blue-100 rounded-md sm:mt-6'>
      <h3 className='mb-4 text-3xl font-semibold'>Recipe Created!</h3>
      <p className='my-4 text-xl text-center'>
        Your recipe <span className='font-semibold'>{newRecipe.title}</span> was
        created successfully.
      </p>
      <Link href={`/recipes/${newRecipe._id}`}>
        <a className='my-2 text-lg font-semibold text-blue-600 hover:text-blue-700'>
          View your new recipe
        </a>
      </Link>
      <Link href={'/recipes'}>
        <a className='my-2 text-lg font-semibold text-blue-600 hover:text-blue-700'>
          View all recipes
        </a>
      </Link>
      <button
        className='my-2 text-lg font-semibold text-green-600 hover:text-green-700'
        onClick={onCreateAnother}
      >
        Create another recipe
      </button>
    </div>
  )
}

export default RecipeFormSuccess
