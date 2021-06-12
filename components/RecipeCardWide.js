import Link from 'next/link'
import React from 'react'
import { upper } from '~/utils/helpers'

const RecipeCardWide = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
      <a className='flex items-center w-full px-4 py-4 my-6 transition duration-300 ease-in-out bg-gray-200 rounded shadow-md align-center sm:shadow-sm'>
        <img
          className='object-cover object-center w-1/4 rounded cursor-pointer min-w-1/2 max-h-56'
          src={recipe.imageUrl}
          alt='content'
        />
        <div className='flex-grow ml-4'>
          <span className='mb-1 text-xs font-medium tracking-wider text-blue-500'>
            {recipe.tags.length ? recipe.tags.map(upper).join(', ') : null}
          </span>
          <h2 className='mb-0 text-xl font-semibold text-gray-700 lg:text-2xl title-font hover:text-gray-800'>
            {recipe.title}
          </h2>
          <p className='text-base leading-relaxed'>{recipe.description}</p>
        </div>
      </a>
    </Link>
  )
}

export default RecipeCardWide
