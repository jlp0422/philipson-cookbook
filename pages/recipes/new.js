import Head from '@/components/Head'
import RecipeForm from '@/components/RecipeForm'
import Layout from '@/components/shared/Layout'

const NewRecipe = () => {
  return (
    <Layout>
      <Head title='New Recipe | Philipson Cookbook' />
      <h2>create new recipe</h2>
      <RecipeForm />
    </Layout>
  )
}

export default NewRecipe
