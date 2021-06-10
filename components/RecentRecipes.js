import { useQuery } from '@apollo/client'
import React from 'react'
import RecipeCard from '~/components/RecipeCard'
import Loading from '~/components/shared/Loading'
import GridContainer from '~/components/shared/GridContainer'
import RECIPES_QUERY from '~/graphql/queries/recipes'
import { getRandomAmount } from '~/utils/helpers'

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

  const recipes = data.recipes.data
  const featured = getRandomAmount(3, data.recipes.data)
  const trending = getRandomAmount(6, data.recipes.data)

  return (
    <div className='mt-4 mb-8'>
      <div className='my-4 mb-8'>
        <h1 className='mb-4 text-xl sm:text-3xl'>Featured Recipes</h1>
        <GridContainer>
          {featured.map(index => (
            <RecipeCard recipe={recipes[index]} key={recipes[index]._id} />
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
