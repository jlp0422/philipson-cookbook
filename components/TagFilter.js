import Checkbox from './shared/form/Checkbox'
import { useState } from 'react'

const TagFilter = ({ tags, selectedTags, setSelectedTags }) => {
  const [showTags, setShowTags] = useState(false)
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

  const tagCopy = showTags ? (
    <button onClick={() => setShowTags(!showTags)}>&#8593;</button>
  ) : (
    <button onClick={() => setShowTags(!showTags)}>&#8595;</button>
  )

  return (
    <div>
      <h3 className='text-xl sm:text-2xl'>Recipe Type {tagCopy}</h3>
      <div
        className="overflow-scroll max-h-24"
        style={{
          transformOrigin: 'top center',
          ...(showTags ? { display: 'block' } : { display: 'none' })
        }}
      >
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
