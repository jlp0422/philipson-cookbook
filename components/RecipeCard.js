import Link from 'next/link'

const RecipeCard = ({ recipe }) => {
  console.log({ recipeCard: recipe })

  return (
    <Link href={`/recipes/${recipe._id}`}>
      <a className='px-4 py-6 bg-gray-200 rounded shadow-sm hover:shadow-lg'>
        <img
          className='object-cover object-center w-full h-40 mb-6 rounded cursor-pointer'
          src={
            recipe.imageUrl || 'https://dummyimage.com/720x400/F3F4F7/8693ac'
          }
          alt='content'
        />
        <div className='flex items-center justify-between'>
          <h2 className='mb-3 text-lg font-semibold text-gray-600 lg:text-2xl title-font hover:text-gray-800'>
            {recipe.title}
          </h2>
          <span className='mb-1 text-xs font-medium tracking-widest text-blue-500 title-font'>
            {recipe.tags.join(', ')}
          </span>
        </div>
        <p className='mb-4 text-base leading-relaxed'>{recipe.description}</p>
      </a>
    </Link>
  )
}

export default RecipeCard
