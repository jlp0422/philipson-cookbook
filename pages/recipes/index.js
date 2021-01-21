import Head from '@/components/Head'
import { useRecipes } from '@/graphql/api'
import Recipe from '@/components/Recipe'

const Recipes = () => {
  const { data, errorMessage } = useRecipes()
  console.log({ data })

  if (!data && !errorMessage) {
    return <h2>Loading...</h2>
  }

  if (errorMessage) {
    return <h3>error!</h3>
  }

  return (
    <>
      <Head title='Recipes | Philipson Cookbook' />
      {data.recipes.data.slice(-2).map(recipe => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </>
  )
}

export default Recipes
