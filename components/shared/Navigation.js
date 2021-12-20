import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { client } from '~/graphql/apolloClient'
import RECIPES_BY_ID from '~/graphql/queries/recipesById'
import HamburgerIcon from '~/icons/Hamburger'
import NakedXIcon from '~/icons/NakedX'
import { getRandomId } from '~/utils/helpers'

const Navigation = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { asPath, pathname, query } = router
  const [getAllRecipeIds] = useLazyQuery(RECIPES_BY_ID, {
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

  const onNewRecipe = () => {
    if (pathname === '/recipes/new') {
      router.reload()
    } else {
      router.push('/recipes/new')
    }
  }

  const checkActivePath = (current, pathToCheck) =>
    current === pathToCheck ? 'bg-blue-200' : 'bg-blue-100'

  return (
    <header className='sticky top-0 z-50 text-gray-700 bg-blue-100 border-blue-300 sm:border-t sm:border-b body-font'>
      <nav className='flex-col items-center justify-between max-w-screen-xl px-2 py-2 border-b border-blue-300 sm:px-0 sm:mx-8 sm:flex sm:items-center sm:flex-row md:mx-12 lg:mx-16 2xl:mx-auto sm:border-0'>
        <div className='grid py-1 sm:hidden grid-cols-[50px_1fr_50px]'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='block w-8 h-8 text-gray-500 transition duration-500 ease-in-out transform hover:text-gray-700 focus:text-gray-700 focus:outline-none'
          >
            {isOpen ? <NakedXIcon /> : <HamburgerIcon />}
          </button>
          <h3 className='my-auto overflow-hidden text-xl text-center text-gray-700 text-ellipsis whitespace-nowrap'>
            {title}
          </h3>
        </div>
        <div
          className={`sm:mt-0 sm:flex sm:visible sm:opacity-100 sm:h-auto items-center justify-center text-base transition-opacity ${
            isOpen
              ? 'visible opacity-100 h-auto mt-2'
              : 'invisible opacity-0 h-0 mt-0'
          }`}
        >
          <Link href='/'>
            <a className={`nav-link ${checkActivePath(asPath, '/')}`}>Home</a>
          </Link>
          <Link href='/recipes'>
            <a className={`nav-link ${checkActivePath(asPath, '/recipes')}`}>
              All Recipes
            </a>
          </Link>
          {/*<button className={navLink} onClick={getRandomRecipe}>
            Random Recipe
          </button>*/}
          <button
            onClick={onNewRecipe}
            className={`nav-link block sm:hidden ${checkActivePath(
              asPath,
              '/recipes/new'
            )}`}
          >
            New Recipe
          </button>
        </div>
        <button
          className='hidden sm:block nav-new-recipe-button'
          onClick={onNewRecipe}
        >
          New Recipe
        </button>
      </nav>
    </header>
  )
}

export default Navigation
