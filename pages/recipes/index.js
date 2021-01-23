import Head from '@/components/Head'
import RecipeCard from '@/components/RecipeCard'
import Layout from '@/components/shared/Layout'
import RECIPES_QUERY from '@/graphql/queries/recipes'
import { useQuery } from '@apollo/client'

const Recipes = () => {
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: {
      size: 100
    }
  })
  console.log({ 'pages/recipes': data })

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h3>error!: {JSON.stringify(error, null, 2)}</h3>
  }

  return (
    <Layout>
      <Head title='Recipes | Philipson Cookbook' />
      {data.recipes.data.slice(-2).map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </Layout>
  )
}

export default Recipes
