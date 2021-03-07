import { gql } from '@apollo/client'

export default gql`
  query Recipes($size: Int) {
    recipes(_size: $size) {
      data {
        _id
        _ts
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
        servings
        totalTime
        tags
        notes
        comments {
          data {
            author
            text
          }
        }
      }
      after
    }
  }
`
