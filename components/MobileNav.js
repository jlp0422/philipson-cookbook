import { client } from '@/graphql/apolloClient'
import RECIPES_BY_ID from '@/graphql/queries/recipesById'
import { getRandomId } from '@/utils/helpers'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const createRoutes = getRandomRecipe => [
  { name: 'Home', path: '/', matcher: '/' },
  { name: 'All Recipes', path: '/recipes', matcher: '/recipes' },
  {
    name: 'Random Recipe',
    path: '',
    matcher: '/recipes/[id]',
    onClick: getRandomRecipe
  },
  { name: 'New Recipe', path: '/recipes/new', matcher: '/recipes/new' }
]

const checkActivePath = (current, pathToCheck) =>
  current === pathToCheck ? 'text-white' : 'text-black'

const MobileNav = ({
  isOpen,
  setIsOpen,
  getRandomRecipe,
  pathname,
  asPath
}) => {
  const routes = createRoutes(getRandomRecipe)
  return (
    <div className='fixed top-0 left-0 z-40 block w-screen text-center bg-blue-500 h-1/2 sm:hidden opacity-80'>
      <button onClick={() => setIsOpen(!isOpen)}>
        <h2>nav</h2>
      </button>
      {isOpen && (
        <ul>
          {routes.map(({ name, path, matcher, onClick }) => (
            <li key={name}>
              {onClick ? (
                <button
                  className={checkActivePath(pathname, matcher)}
                  onClick={onClick}
                >
                  {name}
                </button>
              ) : (
                <Link href={path}>
                  <a className={checkActivePath(asPath, matcher)}>{name}</a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MobileNav
