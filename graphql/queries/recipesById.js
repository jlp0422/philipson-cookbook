import { gql } from '@apollo/client'

export default gql`
  query RecipesById {
    recipes {
      data {
        _id
      }
    }
  }
`
