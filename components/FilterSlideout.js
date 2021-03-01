import TAGS_QUERY from '@/graphql/queries/tags'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import IngredientFilter from './IngredientFilter'
import Button from './shared/Button'
import TagFilter from './TagFilter'

const FilterSlideout = ({
  selectedTags,
  setSelectedTags,
  maxNumIngredients,
  setMaxNumIngredients,
  close
}) => {
  const [tags, setTags] = useState([])
  // const { loading, error } = useQuery(TAGS_QUERY, {
  //   onCompleted: data => {
  //     const allTags = data.recipes.data.flatMap(recipe => recipe.tags)
  //     const uniqueTags = new Set(allTags)
  //     setTags(Array.from(uniqueTags).sort())
  //   }
  // })

  const data = {
    recipes: {
      data: [
        { tags: ['Dinner'], __typename: 'Recipe' },
        { tags: ['Side'], __typename: 'Recipe' },
        { tags: ['Dinner', 'Under 30 Mins'], __typename: 'Recipe' },
        { tags: [], __typename: 'Recipe' }
      ],
      __typename: 'RecipePage'
    }
  }

  useEffect(() => {
    const allTags = data.recipes.data.flatMap(recipe => recipe.tags)
    const uniqueTags = new Set(allTags)
    setTags(Array.from(uniqueTags).sort())
  }, [])

  const handleEscape = ev => {
    if (ev.key === 'Esc' || ev.key === 'Escape' || ev.keyCode === 27) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  })

  return (
    <div className='p-4'>
      {tags.length ? (
        <TagFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
      ) : null}
      <IngredientFilter
        maxNumIngredients={maxNumIngredients}
        setMaxNumIngredients={setMaxNumIngredients}
      />
      <Button className='py-2 my-4' onClick={close} color='red'>
        Close
      </Button>
    </div>
  )
}

export default FilterSlideout
