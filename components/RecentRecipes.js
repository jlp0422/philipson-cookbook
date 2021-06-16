import { useQuery } from '@apollo/client'
import React from 'react'
import RecipeCard from '~/components/RecipeCard'
import Loading from '~/components/shared/Loading'
import GridContainer from '~/components/shared/GridContainer'
import RECIPES_BY_TIMESTAMP_QUERY from '~/graphql/queries/recipesByTimestampDesc'
import { getRandomAmount } from '~/utils/helpers'

const RecentRecipes = () => {
  const { data, loading, error } = useQuery(RECIPES_BY_TIMESTAMP_QUERY, {
    variables: { size: 100 }
  })

  if (loading) {
    return <Loading modifier='orange' size='large' styles='mt-16' />
  }

  if (error) {
    return <h3>Something went wrong: {JSON.stringify(error, null, 2)}</h3>
  }

  const recipes = data.recipesByTimestampDesc.data
  const latest = recipes.slice(0, 3)
  const trending = getRandomAmount(6, recipes.slice(3))

  return (
    <div className='mt-4 mb-8'>
      <div className='my-4 mb-8'>
        <h1 className='mb-4 text-xl sm:text-3xl'>Latest Recipes</h1>
        <GridContainer>
          {latest.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe._id} />
          ))}
        </GridContainer>
      </div>
      <div className='my-4'>
        <h1 className='mb-4 text-xl sm:text-3xl'>Trending Recipes</h1>
        <GridContainer>
          {trending.map(index => (
            <RecipeCard recipe={recipes[index]} key={recipes[index]._id} />
          ))}
        </GridContainer>
      </div>
    </div>
  )
}

export default RecentRecipes
