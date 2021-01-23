import Recipe from '@/components/Recipe'
import Layout from '@/components/shared/Layout'
import { useRouter } from 'next/router'

const RecipePage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return <h2>Loading...</h2>
  }

  return (
    <Layout>
      <Recipe recipeId={id} />
    </Layout>
  )
}

export default RecipePage
