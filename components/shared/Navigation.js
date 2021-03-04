import { client } from '@/graphql/apolloClient'
import RECIPES_BY_ID from '@/graphql/queries/recipesById'
import { getRandomId } from '@/utils/helpers'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NakedXIcon from '@/icons/NakedX'
import HamburgerIcon from '@/icons/Hamburger'

const newRecipeClass =
  'items-center px-4 py-2 text-sm font-semibold text-green-700 transition duration-500 ease-in-out transform bg-white border border-green-700 rounded-lg lg:inline-flex lg:ml-auto lg:mt-px hover:bg-green-700 hover:text-white focus:ring focus:outline-none'
const navLink =
  'block sm:inline-block sm:mr-8 text-base sm:text-sm rounded font-semibold text-gray-600 py-1.5 hover:bg-blue-300 px-2 transition duration-300 ease-in-out transform'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { asPath, pathname, query } = router
  const [getAllRecipeIds, { loading }] = useLazyQuery(RECIPES_BY_ID, {
    onCompleted: data => routeToRandomRecipe(data)
  })

  const getRandomRecipe = () => {
    const data = client.readQuery({ query: RECIPES_BY_ID })
    if (data) {
      routeToRandomRecipe(data)
    } else {
      getAllRecipeIds()
    }
  }

  const routeToRandomRecipe = ({ recipes }) => {
    const randomRecipeId = getRandomId(recipes.data)
    if (randomRecipeId === query.id) {
      return routeToRandomRecipe({ recipes })
    }
    router.push(`/recipes/${randomRecipeId}`)
  }

  const checkActivePath = (current, pathToCheck) =>
    current === pathToCheck ? 'bg-blue-200' : 'bg-blue-100'

  return (
    <header className='sticky top-0 z-50 text-gray-700 bg-blue-100 border-blue-300 sm:border-t sm:border-b body-font'>
      <nav className='flex-col items-center justify-between max-w-screen-xl px-2 py-2 border-b border-blue-300 sm:px-0 sm:mx-8 sm:flex sm:items-center sm:flex-row md:mx-12 lg:mx-16 2xl:mx-auto sm:border-0'>
        <div className='py-1 sm:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='block w-8 h-8 text-gray-500 transition duration-500 ease-in-out transform hover:text-gray-700 focus:text-gray-700 focus:outline-none'
          >
            {isOpen ? <NakedXIcon /> : <HamburgerIcon />}
          </button>
        </div>
        <div
          className={`sm:mt-0 sm:flex sm:visible sm:opacity-100 sm:h-auto items-center justify-center text-base transition-opacity ${
            isOpen
              ? 'visible opacity-100 h-auto mt-2'
              : 'invisible opacity-0 h-0 mt-0'
          }`}
        >
          <Link href='/'>
            <a className={`${navLink} ${checkActivePath(asPath, '/')}`}>Home</a>
          </Link>
          <Link href='/recipes'>
            <a className={`${navLink} ${checkActivePath(asPath, '/recipes')}`}>
              All Recipes
            </a>
          </Link>
          <button
            className={`${navLink} ${checkActivePath(
              pathname,
              '/recipes/[id]'
            )}`}
            onClick={getRandomRecipe}
          >
            Random Recipe
          </button>
          <Link href='/recipes/new'>
            <a className='block sm:hidden'>
              <button
                className={`${navLink} ${checkActivePath(
                  asPath,
                  '/recipes/new'
                )}`}
              >
                New Recipe
              </button>
            </a>
          </Link>
        </div>
        <Link href='/recipes/new'>
          <a className='hidden sm:block'>
            <button className={newRecipeClass}>New Recipe</button>
          </a>
        </Link>
      </nav>
    </header>
  )
}

export default Navigation
