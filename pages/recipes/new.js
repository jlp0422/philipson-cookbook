import Head from '@/components/Head'
import RecipeForm from '@/components/RecipeForm'

const NewRecipe = () => {
  return (
    <>
      <Head title='New Recipe | Philipson Cookbook' />
      <h2>create new recipe</h2>
      <RecipeForm />
    </>
  )
}

export default NewRecipe
