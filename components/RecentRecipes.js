import { useQuery } from '@apollo/client'
import React from 'react'
import RecipeCard from '~/components/RecipeCard'
import RecipeCardWide from '~/components/RecipeCardWide'
import Loading from '~/components/shared/Loading'
import RECIPES_QUERY from '~/graphql/queries/recipes'

const RecentRecipes = () => {
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: { size: 100 }
  })

  if (loading) {
    return <Loading modifier='orange' size='large' styles='mt-16' />
  }

  if (error) {
    return <h3>Something went wrong: {JSON.stringify(error, null, 2)}</h3>
  }

  const mostRecentRecipe = data.recipes.data.slice(-1)[0]
  const nextFourRecipes = data.recipes.data.slice(-5, -1)

  return (
    <div className='mt-4'>
      <RecipeCardWide recipe={mostRecentRecipe} />
      <div
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}
        className='grid text-left gap-x-8 gap-y-8'
      >
        {nextFourRecipes.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </div>
    </div>
  )
}

export default RecentRecipes
