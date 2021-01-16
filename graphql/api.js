import useFetch from '../lib/useFetch'

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

/**
|--------------------------------------------------
| This GraphQL query returns an array of Recipe
| recipes complete with both the provided and implicit
| data attributes.
|
| Learn more about GraphQL: https://graphql.org/learn/
|--------------------------------------------------
*/
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
        picture
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

/**
|--------------------------------------------------
| This GraphQL mutation creates a new Recipe
| with the requisite arguments
|
| It returns the stored data and includes the unique
| identifier (_id) as well as _ts (time created).
|
| The guestbook uses the _id value as the unique key
| and the _ts value to sort and display the date of
| publication.
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const createRecipe = async recipeInput => {
  const query = `mutation CreateRecipe($recipeInput: RecipeInput!) {
    createRecipe(data: $recipeInput) {
      data {
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
        picture
        source
        tags
        notes
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
        variables: { recipeInput }
      })
    }
  )

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}
