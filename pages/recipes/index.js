import Head from '@/components/shared/Head'
import RecipeCard from '@/components/RecipeCard'
import Layout from '@/components/shared/Layout'
import Sidebar from '@/components/Sidebar'
import PageHeader from '@/components/shared/PageHeader'
import RECIPES_QUERY from '@/graphql/queries/recipes'
import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

const Recipes = () => {
  const [selectedTags, setSelectedTags] = useState([])
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: { size: 100 }
  })
  console.log({ 'pages/recipes': data })

  const filteredRecipes = useMemo(() => {
    if (!data) {
      return []
    }

    const recipes = data.recipes.data

    if (selectedTags.length) {
      return recipes.filter(({ tags }) =>
        tags.some(tag => selectedTags.includes(tag))
      )
    }

    return recipes
  }, [selectedTags, data])

  return (
    <Layout>
      <Head title='Recipes | Philipson Cookbook' />
      <PageHeader>All Recipes</PageHeader>
      {loading && <h2>Loading...</h2>}
      {error && <h3>error!: {JSON.stringify(error, null, 2)}</h3>}
      {!loading && !error && (
        <div className="grid py-8 mx-auto " style={{ gridTemplateColumns: '250px 1fr'}}>
          <Sidebar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <section className='text-gray-700 body-font'>
            <div
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
              }}
              className='grid text-left gap-x-8 gap-y-8'
            >
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
      )}
    </Layout>
  )
}

export default Recipes
