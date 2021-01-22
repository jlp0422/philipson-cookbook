import { useRecipe } from '@/graphql/api'
import { useEffect, useState } from 'react'

const Recipe = ({ recipeId }) => {
  const [recipe, setRecipe] = useState({})
  const { data, error, errorMessage } = useRecipe(recipeId)

  useEffect(() => {
    if (data) {
      setRecipe(data.findRecipeByID)
    }
  }, [data])

  if (!data && !error) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h3>error!: {errorMessage}</h3>
  }

  console.log({ recipe })

  return (
    <section className='text-gray-700 body-font'>
      <div className='container flex flex-col items-center px-5 py-16 mx-auto lg:px-20 lg:py-24 md:flex-row'>
        <div className='flex flex-col items-center w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 lg:mr-20 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0 lg:text-center'>
          <h2 className='mb-1 text-xs font-medium tracking-widest text-blue-500 title-font'>
            {recipe.tags.join(', ')}
          </h2>
          <h1 className='mb-8 text-2xl font-bold tracking-tighter text-center text-blue-800 lg:text-left lg:text-5xl title-font'>
            {recipe.title}
          </h1>
          <p className='mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-left lg:text-1xl'>
            {recipe.description}
          </p>
          <div className='flex justify-center'>
            <p className='inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0'>
              {recipe.author}
            </p>
          </div>
        </div>
        <div className='w-5/6 lg:max-w-lg lg:w-full md:w-1/2'>
          <img
            className='object-cover object-center rounded-lg '
            alt='hero'
            src='https://dummyimage.com/720x600/F3F4F7/8693ac'
          />
        </div>
      </div>
    </section>
  )
}

export default Recipe
