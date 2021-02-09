import RecipeForm from '@/components/RecipeForm'
import Head from '@/components/shared/Head'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'

const NewRecipe = () => {
  return (
    <Layout>
      <Head title='New Recipe | Philipson Cookbook' />
      <PageHeader>New Recipe</PageHeader>
      <RecipeForm />
    </Layout>
  )
}

export default NewRecipe
