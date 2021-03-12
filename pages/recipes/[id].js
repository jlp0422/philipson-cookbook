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

  // const { data, error, loading } = useQuery(RECIPE_QUERY, {
  //   variables: { id }
  // })

  const loading = false
  const error = false
  const data = {
    findRecipeByID: {
      author: 'carolyn fine',
      title: 'Greek Salad with Tahini Dressing',
      description: 'the second best falafel recipe on the earth',
      ingredients: {
        data: [
          {
            amount: 2.0,
            measurement: 'CUP',
            item: 'water',
            __typename: 'Ingredient'
          },
          {
            amount: 5.0,
            measurement: 'TEASPOON',
            item: 'falafel',
            __typename: 'Ingredient'
          }
        ],
        __typename: 'IngredientPage'
      },
      steps: ['pour the water', 'add the mix', 'put in oven'],
      imageUrl: null,
      source: null,
      tags: ['Dinner'],
      notes: 'be sure to wait 30 minutes!',
      comments: {
        data: [{ author: 'Jeremy P', text: 'This was great! Make sure to let the falafel sit for 60 mins.', __typename: 'Comment' }],
        __typename: 'CommentPage'
      },
      __typename: 'Recipe'
    }
  }

  const pageTitle = data && data.findRecipeByID ? data.findRecipeByID.title : ''

  return (
    <Layout title={pageTitle}>
      <Recipe {...{ data, loading, error, recipeId: id }} />
    </Layout>
  )
}

export default RecipePage
