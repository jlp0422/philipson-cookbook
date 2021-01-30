import { client } from '@/graphql/apolloClient'
import RECIPES_BY_ID from '@/graphql/queries/recipesById'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getRandomId } from '@/utils/helpers'

const newRecipeClass =
  'items-center px-4 py-2 text-sm font-semibold text-green-700 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:inline-flex lg:ml-auto lg:mt-px hover:border-green-700 hover:bg-green-700 hover:text-white focus:ring focus:outline-none'
const navLink =
  'mr-8 text-sm font-semibold text-gray-600 pb-1.5 hover:text-gray-800 border-b-2 border-gray-600 hover:border-gray-800'

const Navigation = () => {
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
    current === pathToCheck ? 'border-opacity-100' : 'border-opacity-0'

  return (
    <header className='sticky top-0 z-10 text-gray-700 bg-blue-100 border-t border-b body-font'>
      <div className='flex flex-col flex-wrap max-w-screen-xl py-2 mx-8 md:items-center md:flex-row md:mx-12 lg:mx-16 2xl:mx-auto'>
        <nav className='flex flex-wrap items-center justify-center text-base '>
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
        </nav>
        <Link href='/'>
          <a className='flex items-center w-40 mx-auto mb-4 font-medium text-gray-900 title-font md:mb-0'>
            <img src='' alt='' />
          </a>
        </Link>
        <Link href='/recipes/new'>
          <a>
            <button className={newRecipeClass}>New Recipe</button>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Navigation
