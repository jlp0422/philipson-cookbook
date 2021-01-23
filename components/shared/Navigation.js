import RECIPES_BY_ID from '@/graphql/queries/recipesById'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const getRandom = array => {
  const randomNum = Math.floor(Math.random() * array.length)
  return array[randomNum]._id
}

const Navigation = () => {
  const router = useRouter()
  const { asPath, pathname } = router
  const [getAllRecipeIds, { loading, data, error }] = useLazyQuery(
    RECIPES_BY_ID,
    {
      onCompleted: data => goToRandomRecipe(data),
      fetchPolicy: 'network-only'
    }
  )
  console.log({ loading, data, error })
  /*
  asPath: "/recipes/288298211428270596"
  pathname: "/recipes/[id]"
  */

  // console.log({ asPath, pathname })

  const goToRandomRecipe = ({ recipes }) => {
    const randomRecipeId = getRandom(recipes.data)
    router.push(`/recipes/${randomRecipeId}`)
  }
  return (
    <header className='text-gray-700 bg-white border-t border-b body-font'>
      <div className='container flex flex-col flex-wrap px-5 py-2 mx-auto md:items-center md:flex-row '>
        <nav className='flex flex-wrap items-center justify-center text-base '>
          <Link href='/'>
            <a className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'>
              Home
            </a>
          </Link>
          <Link href='/recipes'>
            <a className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'>
              All Recipes
            </a>
          </Link>
          <button onClick={getAllRecipeIds}>
            <a className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'>
              Random Recipe
            </a>
          </button>
          {/* <Link href='#'>
            <a className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'>
              Now
            </a>
          </Link> */}
        </nav>
        {/* <Link href='#'>
          <a className='flex items-center w-40 mx-auto mb-4 font-medium text-gray-900 title-font md:mb-0'>
            <img src='../badges/WhitePink.svg' alt='' />
          </a>
        </Link> */}
        <Link href='/recipes/new'>
          <a>
            <button className='items-center px-8 py-2 mt-2 font-semibold text-green-700 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:inline-flex lg:ml-auto lg:mt-px hover:border-green-700 hover:bg-green-700 hover:text-white focus:ring focus:outline-none'>
              New Recipe
            </button>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Navigation
