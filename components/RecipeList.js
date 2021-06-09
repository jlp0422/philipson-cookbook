import FilterBar from '~/components/FilterBar'
import RecipeCard from '~/components/RecipeCard'
import Loading from '~/components/shared/Loading'

const RecipeList = ({ recipes, loading, error, ...filterProps }) => {
  const hasRecipes = recipes.length > 0
  if (loading) {
    return <Loading modifier='orange' size='large' styles='mt-16' />
  }

  if (error) {
    return <h3>Something went wrong: {JSON.stringify(error, null, 2)}</h3>
  }

  return (
    <section className='py-0 mx-auto text-gray-700 sm:py-4 body-font'>
      <FilterBar {...filterProps} />
      <div
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}
        className='grid text-left gap-x-8 gap-y-8'
      >
        {hasRecipes ? (
          recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <div>
            <h2>No recipes found - adjust your filters!</h2>
          </div>
        )}
      </div>
    </section>
  )
}

export default RecipeList
