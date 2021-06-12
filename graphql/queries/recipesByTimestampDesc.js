import { gql } from '@apollo/client'

export default gql`
  query RecipesByTimestampDesc($size: Int) {
    recipesByTimestampDesc(_size: $size) {
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
