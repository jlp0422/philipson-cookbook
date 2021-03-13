import Recipe from '~/components/Recipe'
import Layout from '~/components/shared/Layout'
import RECIPE_QUERY from '~/graphql/queries/recipe'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const RecipePage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return <h2>Loading...</h2>
  }

  const { data, error, loading } = useQuery(RECIPE_QUERY, {
    variables: { id }
  })

  const pageTitle = data && data.findRecipeByID ? data.findRecipeByID.title : ''

  return (
    <Layout title={pageTitle}>
      <Recipe {...{ data, loading, error, recipeId: id }} />
    </Layout>
  )
}

export default RecipePage
