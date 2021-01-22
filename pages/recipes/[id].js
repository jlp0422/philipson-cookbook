import { useRouter } from 'next/router'
import Recipe from '@/components/Recipe'

const RecipePage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return <h2>Loading...</h2>
  }

  return <Recipe recipeId={id} />
}

export default RecipePage
