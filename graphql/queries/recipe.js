import { gql } from '@apollo/client'

export default gql`
  query Recipe($id: ID!) {
    findRecipeByID(id: $id) {
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
      imageUrl
      source
      tags
      notes
      comments {
        data {
          author
          text
        }
      }
    }
  }
`
