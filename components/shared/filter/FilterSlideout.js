import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import TAGS_QUERY from '~/graphql/queries/tags'
import IngredientFilter from './IngredientFilter'
import TotalTimeFilter from './TotalTimeFilter'
import ServingSizeFilter from './ServingSizeFilter'
import Button from '~/components/shared/Button'
import TagFilter from './TagFilter'
import {
  INGREDIENTS_FILTER_ENABLED,
  TAGS_FILTER_ENABLED
} from '~/utils/constants'

const FilterSlideout = ({
  selectedTags,
  setSelectedTags,
  maxNumIngredients,
  setMaxNumIngredients,
  maxTotalTime,
  setMaxTotalTime,
  maxNumServings,
  setMaxNumServings,
  showFilters,
  totalRecipes,
  close
}) => {
  const [tags, setTags] = useState([])
  const copy = totalRecipes === 1 ? 'recipe' : 'recipes'

  const setUniqueTags = data => {
    const allTags = data.recipes.data.flatMap(recipe => recipe.tags)
    const uniqueTags = new Set(allTags)
    setTags(Array.from(uniqueTags).sort())
  }

  const { data } = useQuery(TAGS_QUERY, {
    onCompleted: setUniqueTags
  })

  useEffect(() => {
    if (data) {
      setUniqueTags(data)
    }
  }, [data])

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
      className='fixed z-20 w-3/4 p-4 overflow-y-scroll transition duration-300 ease-in-out bg-gray-400 rounded-lg shadow-md sm:duration-500 top-18 bottom-4 right-4 sm:w-3/5 md:w-1/2 lg:w-2/5'
      style={{
        transform: showFilters ? 'translateX(0)' : 'translateX(110%)'
      }}
    >
      {tags.length && TAGS_FILTER_ENABLED ? (
        <TagFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
      ) : null}
      {INGREDIENTS_FILTER_ENABLED && (
        <IngredientFilter
          maxNumIngredients={maxNumIngredients}
          setMaxNumIngredients={setMaxNumIngredients}
        />
      )}
      <TotalTimeFilter
        maxTotalTime={maxTotalTime}
        setMaxTotalTime={setMaxTotalTime}
      />
      <ServingSizeFilter
        maxNumServings={maxNumServings}
        setMaxNumServings={setMaxNumServings}
      />
      <Button className='py-2 my-4' onClick={close} color='green'>
        Search {`(${totalRecipes} ${copy})`}
      </Button>
    </div>
  )
}

export default FilterSlideout
