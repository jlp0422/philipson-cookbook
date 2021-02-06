import { gql } from '@apollo/client'

export default gql`
  mutation PostComment($commentInput: CommentInput!) {
    createComment(data: $commentInput) {
      author
      text
      recipe {
        _id
      }
    }
  }
`
