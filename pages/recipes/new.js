import RecipeForm from '@/components/RecipeForm'
import Head from '@/components/shared/Head'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'
import { createPageTitle } from '@/utils/helpers'

const NewRecipe = () => {
  const pageTitle = 'New Recipe'
  return (
    <Layout title={pageTitle}>
      <Head title={createPageTitle(pageTitle)} />
      <PageHeader>{pageTitle}</PageHeader>
      <RecipeForm />
    </Layout>
  )
}

export default NewRecipe
