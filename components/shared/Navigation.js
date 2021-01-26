import { client } from '@/graphql/apolloClient'
import RECIPES_BY_ID from '@/graphql/queries/recipesById'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getRandomId } from '@/utils/helpers'

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

  /*
  asPath: "/recipes/288298211428270596"
  pathname: "/recipes/[id]"
  */

  const activeClass = 'border-opacity-2'

  return (
    <header className='text-gray-700 bg-white border-t border-b body-font'>
      <div className='container flex flex-col flex-wrap px-5 py-2 mx-auto md:items-center md:flex-row '>
        <nav className='flex flex-wrap items-center justify-center text-base '>
          <Link href='/'>
            <a
              className={`mr-8 text-sm font-semibold text-gray-600 pb-1.5 hover:text-gray-800 border-b-2 border-gray-600 ${
                asPath === '/' ? 'border-opacity-2' : 'border-opacity-0'
              }`}
            >
              Home
            </a>
          </Link>
          <Link href='/recipes'>
            <a
              className={`mr-8 text-sm font-semibold text-gray-600 pb-1.5 hover:text-gray-800 border-b-2 border-gray-600 ${
                asPath === '/recipes' ? 'border-opacity-2' : 'border-opacity-0'
              }`}
            >
              All Recipes
            </a>
          </Link>
          <button
            className={`mr-8 text-sm font-semibold text-gray-600 pb-1.5 hover:text-gray-800 border-b-2 border-gray-600 ${
              pathname === '/recipes/[id]'
                ? 'border-opacity-2'
                : 'border-opacity-0'
            }`}
            onClick={getRandomRecipe}
          >
            Random Recipe
          </button>
          {/* <Link href='#'>
            <a className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'>
              Now
            </a>
          </Link> */}
        </nav>
        <Link href='/'>
          <a className='flex items-center w-40 mx-auto mb-4 font-medium text-gray-900 title-font md:mb-0'>
            <img src='' alt='' />
          </a>
        </Link>
        <Link href='/recipes/new'>
          <a>
            <button className='items-center px-4 py-2 text-sm font-semibold text-green-700 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:inline-flex lg:ml-auto lg:mt-px hover:border-green-700 hover:bg-green-700 hover:text-white focus:ring focus:outline-none'>
              New Recipe
            </button>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Navigation
