import { gql } from '@apollo/client'

export default gql`
  query Tags {
    recipes {
      data {
        tags
      }
    }
  }
`
