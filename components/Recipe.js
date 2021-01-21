const Recipe = ({ recipe }) => {
  return (
    <div key={recipe._id}>
      <p>author: {recipe.author}</p>
      <p>title: {recipe.title}</p>
      <p>description: {recipe.description}</p>
    </div>
  )
}

export default Recipe
