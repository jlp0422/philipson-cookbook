import Link from 'next/link'
import { upper } from '@/utils/helpers'

const RecipeCard = ({ recipe }) => {
  const hasTags = Boolean(recipe.tags.length)
  console.log({ recipeCard: recipe })

  return (
    <Link href={`/recipes/${recipe._id}`}>
      <a className='px-4 py-6 bg-gray-200 rounded shadow-sm hover:shadow-lg'>
        <img
          className='object-cover object-center w-full h-40 mb-2 rounded cursor-pointer'
          src={
            recipe.imageUrl || 'https://dummyimage.com/720x400/F3F4F7/8693ac'
          }
          alt='content'
        />
        {hasTags && (
          <span className='mb-1 text-xs font-medium text-blue-500'>
            {recipe.tags.map(upper).join(', ')}
          </span>
        )}
        <div className=''>
          <h2 className='mb-0 text-xl font-semibold text-gray-600 lg:text-2xl title-font hover:text-gray-800'>
            {recipe.title}
          </h2>
        </div>
        <p className='mb-4 text-base leading-relaxed'>{recipe.description}</p>
      </a>
    </Link>
  )
}

export default RecipeCard
