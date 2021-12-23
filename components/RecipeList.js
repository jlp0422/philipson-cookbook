import { useState } from 'react'
import FilterBar from '~/components/shared/filter/FilterBar'
import RecipeCard from '~/components/RecipeCard'
import Loading from '~/components/shared/Loading'
import GridContainer from '~/components/shared/GridContainer'
import Button from '~/components/shared/Button'

const RecipeList = ({ recipes, loading, error, ...filterProps }) => {
  const {
    setSelectedTags,
    setSearchQuery,
    setMaxNumIngredients,
    setMaxTotalTime,
    setMaxNumServings
  } = filterProps
  const [showFilters, setShowFilters] = useState(false)
  const totalRecipes = recipes.length
  const hasRecipes = totalRecipes > 0

  if (loading) {
    return <Loading modifier='orange' size='large' styles='mt-16' />
  }

  if (error) {
    return <h3>Something went wrong: {JSON.stringify(error, null, 2)}</h3>
  }

  return (
    <section className='py-0 mx-auto text-gray-700 sm:py-4 body-font'>
      <FilterBar
        {...filterProps}
        totalRecipes={totalRecipes}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      {hasRecipes ? (
        <GridContainer>
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              showFilters={showFilters}
            />
          ))}
        </GridContainer>
      ) : (
        <div className='mx-4 mt-16 text-center'>
          <h2 className='text-xl'>
            No recipes found - adjust your filters or try a new search!
          </h2>
          <Button
            color="blue"
            className="py-2 mt-4 text-sm"
            onClick={() => {
              setSelectedTags([])
              setSearchQuery('')
              setMaxNumIngredients(0)
              setMaxTotalTime(0)
              setMaxNumServings([])
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
    </section>
  )
}

export default RecipeList
