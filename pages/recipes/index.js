import RecipeList from '@/components/RecipeList'
import Head from '@/components/shared/Head'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'
import RECIPES_QUERY from '@/graphql/queries/recipes'
import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'
import { createPageTitle } from '@/utils/helpers'

const Recipes = () => {
  const pageTitle = 'All Recipes'
  const [selectedTags, setSelectedTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [maxNumIngredients, setMaxNumIngredients] = useState(0)
  // const { data, loading, error } = useQuery(RECIPES_QUERY, {
  //   variables: { size: 100 }
  // })
  const data = {
    recipes: {
      data: [
        {
          _id: '288292488664318468',
          _ts: 1612028825180000,
          author: 'carolyn fine',
          title: 'falafel v2',
          description: 'the second best falafel recipe on the earth',
          ingredients: {
            data: [
              {
                amount: 2.0,
                measurement: 'CUP',
                item: 'water',
                __typename: 'Ingredient'
              },
              {
                amount: 5.0,
                measurement: 'TEASPOON',
                item: 'falafel',
                __typename: 'Ingredient'
              }
            ],
            __typename: 'IngredientPage'
          },
          steps: ['pour the water', 'add the mix', 'put in oven'],
          imageUrl: null,
          source: null,
          tags: ['Dinner'],
          notes: 'be sure to wait 30 minutes!',
          comments: {
            data: [{ author: '', text: '', __typename: 'Comment' }],
            __typename: 'CommentPage'
          },
          __typename: 'Recipe'
        },
        {
          _id: '288295213353402884',
          _ts: 1612028846746000,
          author: 'jeremy philipson',
          title: 'greek yogurt',
          description: 'the best falafel on earth',
          ingredients: {
            data: [
              {
                amount: 3.0,
                measurement: 'CUP',
                item: 'water',
                __typename: 'Ingredient'
              },
              {
                amount: 2.0,
                measurement: 'POUND',
                item: 'flour',
                __typename: 'Ingredient'
              }
            ],
            __typename: 'IngredientPage'
          },
          steps: ['add the mix', 'heat the oven'],
          imageUrl: null,
          source: '',
          tags: ['Side'],
          notes: '',
          comments: { data: [], __typename: 'CommentPage' },
          __typename: 'Recipe'
        },
        {
          _id: '288298211428270596',
          _ts: 1612047871852000,
          author: 'jeremy philipson',
          title: 'baked salmon and brussell sprouts',
          description: 'delicious!!',
          ingredients: {
            data: [
              {
                amount: 1.0,
                measurement: 'POUND',
                item: 'salmon',
                __typename: 'Ingredient'
              },
              {
                amount: 12.0,
                measurement: 'OUNCE',
                item: 'brussell sprouts',
                __typename: 'Ingredient'
              }
            ],
            __typename: 'IngredientPage'
          },
          steps: [
            'preheat oven to 350',
            'put in brussel sprouts',
            'put in salmon',
            'enjoy!'
          ],
          imageUrl:
            'https://res.cloudinary.com/jlp0422/image/upload/v1611201425/philipson-cookbook/dwjonxrx0nmfs6igxvml.jpg',
          source: 'https://rasamalaysia.com/honey-garlic-salmon/',
          tags: ['Dinner', 'Under 30 Mins'],
          notes: 'Be sure to wait until the oven is at 350!!',
          comments: {
            data: [
              {
                author: 'jeremy',
                text: 'this is the best dinner ever!',
                __typename: 'Comment'
              },
              {
                author: 'jeremy philipson',
                text: 'saving a new comment!',
                __typename: 'Comment'
              },
              {
                author: 'jeremy philipson',
                text: 'this is my new comment with apollo!',
                __typename: 'Comment'
              },
              {
                author: 'jeremy philipson',
                text: 'this should show the new comment immediately!',
                __typename: 'Comment'
              },
              {
                author: 'Carolyn Fine',
                text: 'this comment will appear in a flash!',
                __typename: 'Comment'
              }
            ],
            __typename: 'CommentPage'
          },
          __typename: 'Recipe'
        },
        {
          _id: '288534331797799424',
          _ts: 1612028905308000,
          author: 'sammy moreways',
          title: 'buffalo chicken wraps',
          description: 'excellent!',
          ingredients: {
            data: [
              {
                amount: 2.0,
                measurement: 'POUND',
                item: 'chicken',
                __typename: 'Ingredient'
              },
              {
                amount: 2.0,
                measurement: 'TEASPOON',
                item: 'buffalo sauce',
                __typename: 'Ingredient'
              },
              {
                amount: 4.0,
                measurement: 'CUP',
                item: 'flour wraps',
                __typename: 'Ingredient'
              }
            ],
            __typename: 'IngredientPage'
          },
          steps: ['heat the pan', 'add the chicken', 'cut the wraps!'],
          imageUrl: null,
          source: '',
          tags: [],
          notes: '',
          comments: { data: [], __typename: 'CommentPage' },
          __typename: 'Recipe'
        }
      ],
      after: null,
      __typename: 'RecipePage'
    }
  }
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
      recipes = recipes.filter(
        recipe =>
          recipe.title.includes(searchQuery) ||
          recipe.description.includes(searchQuery)
      )
    }

    return recipes
  }, [selectedTags, searchQuery, maxNumIngredients, data])

  return (
    <Layout title={pageTitle}>
      <Head title={createPageTitle(pageTitle)} />
      <PageHeader>{pageTitle}</PageHeader>
      <RecipeList
        recipes={filteredRecipes}
        {...{
          // loading,
          // error,
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
