import Head from '@/components/Head'
import { useRecipes } from '@/graphql/api'
import RecipeCard from '@/components/RecipeCard'

const Recipes = () => {
  const { data, error, errorMessage } = useRecipes()
  console.log({ data })

  if (!data && !error) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h3>error!: {errorMessage}</h3>
  }

  return (
    <>
      <Head title='Recipes | Philipson Cookbook' />
      {data.recipes.data.slice(-2).map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </>
  )
}

export default Recipes
