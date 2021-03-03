import FilterBar from '@/components/FilterBar'
import RecipeCard from '@/components/RecipeCard'

const RecipeList = ({ recipes, loading, error, ...filterProps }) => {
  const hasRecipes = recipes.length > 0
  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h3>error! {JSON.stringify(error, null, 2)}</h3>
  }

  return (
    <section className='pt-4 pb-8 mx-auto text-gray-700 body-font'>
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
            <h2>no recipes found - adjust your filters!</h2>
          </div>
        )}
      </div>
    </section>
  )
}

export default RecipeList
