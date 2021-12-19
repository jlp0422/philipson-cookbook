import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'
import RecipeList from '~/components/RecipeList'
import Head from '~/components/shared/Head'
import Layout from '~/components/shared/Layout'
import PageHeader from '~/components/shared/PageHeader'
import RECIPES_QUERY from '~/graphql/queries/recipes'
import { createPageTitle, lower } from '~/utils/helpers'

const Recipes = () => {
  const pageTitle = 'All Recipes'
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [maxNumIngredients, setMaxNumIngredients] = useState(0)
  const [maxTotalTime, setMaxTotalTime] = useState(0)
  const [maxNumServings, setMaxNumServings] = useState(0)
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: { size: 100 }
  })

  const filteredRecipes = useMemo(() => {
    if (!data) {
      return []
    }

    let recipes = data.recipes.data

    if (selectedTags.length) {
      recipes = recipes.filter(({ tags }) =>
        tags.some(tag => selectedTags.includes(tag))
      )
    }

    if (maxNumIngredients) {
      recipes = recipes.filter(
        recipe => recipe.ingredients.data.length <= maxNumIngredients
      )
    }

    if (maxTotalTime) {
      recipes = recipes.filter(
        recipe => Number(recipe.totalTime) <= maxTotalTime
      )
    }

    if (maxNumServings) {
      recipes = recipes.filter(
        recipe => Number(recipe.servings) <= maxNumServings
      )
    }

    if (searchQuery.length > 2) {
      recipes = recipes.filter(
        recipe =>
          lower(recipe.title).includes(lower(searchQuery)) ||
          lower(recipe.description).includes(lower(searchQuery))
      )
    }

    return recipes
  }, [
    selectedTags,
    searchQuery,
    maxNumIngredients,
    maxTotalTime,
    maxNumServings,
    data
  ])

  return (
    <Layout title={pageTitle}>
      <Head title={createPageTitle(pageTitle)} />
      <PageHeader>{pageTitle}</PageHeader>
      <RecipeList
        recipes={filteredRecipes}
        {...{
          loading,
          error,
          selectedTags,
          setSelectedTags,
          searchQuery,
          setSearchQuery,
          maxNumIngredients,
          setMaxNumIngredients,
          maxTotalTime,
          setMaxTotalTime,
          maxNumServings,
          setMaxNumServings
        }}
      />
    </Layout>
  )
}

export default Recipes
