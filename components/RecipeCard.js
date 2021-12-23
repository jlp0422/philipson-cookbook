import Link from 'next/link'
import { formatServings } from '~/utils/helpers'
// import Pill from '~/components/shared/Pill'

const RecipeCard = ({ recipe, showFilters }) => {
  // const hasTags = Boolean(recipe.tags.length)

  const detail = [
    `${recipe.totalTime} mins`,
    `Serves ${formatServings(recipe.servings)}`
  ]

  return (
    <Link href={`/recipes/${recipe._id}`}>
      <a
        className='px-4 py-6 transition duration-300 ease-in-out bg-gray-200 rounded shadow-md sm:shadow-sm hover-card'
        style={showFilters ? { zIndex: -1 } : {}}
      >
        <img
          className='object-cover object-center w-full h-40 mb-2 rounded cursor-pointer'
          src={recipe.imageUrl}
          alt='content'
        />
        {/* <span className='mb-1 text-xs font-medium tracking-wider text-blue-500'>
          {hasTags ? recipe.tags.map(upper).join(', ') : <br />}
        </span> */}
        {detail.map((detail, index) => (
          <span
            className='mb-1 mr-3 text-xs font-medium tracking-wider text-blue-500 uppercase last:mr-0'
            key={index}
          >
            {detail}
          </span>
        ))}
        <div className=''>
          <h2 className='mb-0 text-xl font-semibold text-gray-700 lg:text-2xl title-font hover:text-gray-800'>
            {recipe.title}
          </h2>
        </div>
        <p
          className='overflow-hidden text-base leading-relaxed'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical'
          }}
        >
          {recipe.description}
        </p>
      </a>
    </Link>
  )
}

export default RecipeCard
