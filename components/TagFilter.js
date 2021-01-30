import TAGS_QUERY from '@/graphql/queries/tags'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Checkbox from './shared/Checkbox'

const TagFilter = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([])
  const { loading, error } = useQuery(TAGS_QUERY, {
    onCompleted: data => {
      const allTags = data.recipes.data.flatMap(recipe => recipe.tags)
      const uniqueTags = new Set(allTags)
      setTags(Array.from(uniqueTags))
    }
  })

  if (!tags.length) {
    return null
  }

  const onHandleCheck = ev => {
    const tag = ev.target.value
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags(selectedTags.concat(tag))
    }
  }

  const onSelectOnly = tag => {
    setSelectedTags(tag)
  }

  console.log({ selectedTags })

  return (
    <div>
      <h3>Tags</h3>
      <div className='flex flex-col'>
        <Checkbox
          label='All'
          id='all'
          checked={!selectedTags.length}
          onHandleCheck={() => onSelectOnly([])}
        />
        {tags.map(tag => (
          <Checkbox
            key={tag}
            label={tag}
            id={tag}
            onHandleCheck={onHandleCheck}
            checked={selectedTags.includes(tag)}
            onSelectOnly={() => onSelectOnly([tag])}
            onlyDisabled={
              selectedTags.length === 1 && selectedTags.includes(tag)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default TagFilter
