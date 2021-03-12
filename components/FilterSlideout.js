import { useEffect, useState } from 'react'
import IngredientFilter from './IngredientFilter'
import Button from './shared/Button'
import TagFilter from './TagFilter'

const FilterSlideout = ({
  selectedTags,
  setSelectedTags,
  maxNumIngredients,
  setMaxNumIngredients,
  showFilters,
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
    <div
      className='fixed z-20 w-3/4 p-4 overflow-y-scroll bg-gray-400 rounded-lg shadow-md transition duration-300 ease-in-out sm:duration-500 top-18 bottom-4 right-4 sm:w-3/5 md:w-1/2 lg:w-2/5'
      style={{
        transform: showFilters ? 'translateX(0)' : 'translateX(110%)'
      }}
    >
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
