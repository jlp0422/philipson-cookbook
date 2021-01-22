import Link from 'next/link'

const RecipeCard = ({ recipe }) => {
  return (
    <div key={recipe._id}>
      <p>author: {recipe.author}</p>
      <p>title: {recipe.title}</p>
      <p>description: {recipe.description}</p>
      <Link href={`/recipes/${recipe._id}`}>go to recipe</Link>
    </div>
  )
}

export default RecipeCard
