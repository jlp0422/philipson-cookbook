import RecipeList from '@/components/RecipeList'
import Head from '@/components/shared/Head'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'
import RECIPES_QUERY from '@/graphql/queries/recipes'
import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

const Recipes = () => {
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [maxNumIngredients, setMaxNumIngredients] = useState(0)
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: { size: 100 }
  })
  console.log({ 'pages/recipes': data })

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

    if (searchQuery.length > 2) {
      recipes = recipes.filter(recipe => recipe.title.includes(searchQuery))
    }

    return recipes
  }, [selectedTags, searchQuery, maxNumIngredients, data])

  return (
    <Layout>
      <Head title='Recipes | Philipson Cookbook' />
      <PageHeader>All Recipes</PageHeader>
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
          setMaxNumIngredients
        }}
      />
    </Layout>
  )
}

export default Recipes