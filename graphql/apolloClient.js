import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`
  },
  cache: new InMemoryCache()
})
