import { gql } from '@apollo/client'

export default gql`
  mutation CreateRecipe($recipeInput: RecipeInput!) {
    createRecipe(data: $recipeInput) {
      _id
      author
      title
      description
      ingredients {
        data {
          amount
          measurement
          item
        }
      }
      steps
      totalTime
      servings
      imageUrl
      source
      tags
      notes
    }
  }
`
