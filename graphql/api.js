import useFetch from '@/utils/useFetch'
import { transformForQuery } from '@/utils/helpers'

function getData(data) {
  if (!data || data.errors) {
    return null
  }
  return data.data
}

function getErrorMessage(error, data) {
  if (error) {
    return error.message
  }
  if (data && data.errors) {
    return data.errors[0].message
  }
  return null
}

export const useRecipes = () => {
  const query = `query Recipes($size: Int) {
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
  }`
  const size = 100
  const { data, error } = useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { size }
      })
    }
  )

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}

export const useRecipe = id => {
  const query = `query Recipe($id: ID!) {
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
  }`
  const { data, error } = useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { id }
      })
    }
  )

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}

export const createRecipe = async recipeFormData => {
  const recipeInput = transformForQuery(recipeFormData)
  const query = `mutation CreateRecipe($recipeInput: RecipeInput!) {
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
      imageUrl
      source
      tags
      notes
    }
  }`

  const response = await fetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { recipeInput }
      })
    }
  )
  const data = await response.json()

  return {
    data: getData(data),
    errorMessage: getErrorMessage(null, data)
  }
}

export const createComment = async ({ author, text, recipeId }) => {
  const query = `mutation PostComment($commentInput: CommentInput!) {
    createComment(data: $commentInput) {
      author
      text
      recipe {
        _id
      }
    }
  }`

  const response = await fetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          commentInput: {
            author,
            text,
            recipe: {
              connect: recipeId
            }
          }
        }
      })
    }
  )
  const data = await response.json()

  return {
    data: getData(data),
    errorMessage: getErrorMessage(null, data)
  }
}
