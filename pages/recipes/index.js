import Head from '@/components/shared/Head'
import RecipeCard from '@/components/RecipeCard'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'
import RECIPES_QUERY from '@/graphql/queries/recipes'
import { useQuery } from '@apollo/client'

const Recipes = () => {
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    variables: {
      size: 100
    }
  })
  console.log({ 'pages/recipes': data })

  const renderContent = () => {
    if (loading) {
      return <h2>Loading...</h2>
    }
    if (error) {
      return <h3>error!: {JSON.stringify(error, null, 2)}</h3>
    }

    return data.recipes.data
      .slice(-4)
      .map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)
  }

  return (
    <Layout>
      <Head title='Recipes | Philipson Cookbook' />
      <PageHeader>All Recipes</PageHeader>
      <section className='text-gray-700 body-font'>
        <div className='py-8 mx-auto'>
          <div
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
            className='grid text-left gap-x-8 gap-y-8'
          >
            {renderContent()}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Recipes
