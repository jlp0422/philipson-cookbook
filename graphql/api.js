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
        ...
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
export const createGuestbookEntry = async (twitterHandle, story) => {
  const query = `mutation CreateGuestbookEntry($twitterHandle: String!, $story: String!) {
    createGuestbookEntry(data: {
      twitter_handle: $twitterHandle,
      story: $story
    }) {
      _id
      _ts
      twitter_handle
      story
    }
  }`

  const res = useFetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: { twitterHandle, story }
    })
  })

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}
