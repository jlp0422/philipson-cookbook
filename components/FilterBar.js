import TAGS_QUERY from '@/graphql/queries/tags'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import IngredientFilter from './IngredientFilter'
import Button from './shared/Button'
import FormInput from './shared/FormInput'
import TagFilter from './TagFilter'

const FilterBar = ({
  selectedTags,
  setSelectedTags,
  searchQuery,
  setSearchQuery,
  maxNumIngredients,
  setMaxNumIngredients
}) => {
  const [showFilters, setShowFilters] = useState(false)
  const [tags, setTags] = useState([])
  const { loading, error } = useQuery(TAGS_QUERY, {
    onCompleted: data => {
      const allTags = data.recipes.data.flatMap(recipe => recipe.tags)
      const uniqueTags = new Set(allTags)
      setTags(Array.from(uniqueTags).sort())
    }
  })

  if (!tags.length) {
    return null
  }

  return (
    <section className='mb-4'>
      <div className='flex items-center'>
        <FormInput
          labelStyles='flex-grow'
          id='search'
          value={searchQuery}
          onChange={ev => setSearchQuery(ev.target.value)}
          placeholder='Search for a recipe'
        />
        <Button
          color='yellow'
          className='mt-1 ml-4 w-36 h-11'
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </Button>
      </div>
      {showFilters && (
        <>
          <TagFilter
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
          <IngredientFilter
            maxNumIngredients={maxNumIngredients}
            setMaxNumIngredients={setMaxNumIngredients}
          />
        </>
      )}
    </section>
  )
}

export default FilterBar
