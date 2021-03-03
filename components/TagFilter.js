import Checkbox from './shared/form/Checkbox'
import { useState } from 'react'
import ArrowDown from '@/icons/ArrowDown'

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

  return (
    <div className='p-4 bg-white rounded'>
      <button
        onClick={() => setShowTags(!showTags)}
        className='flex items-center w-full text-xl sm:text-2xl focus:outline-none'
      >
        <span>Recipe Type</span>
        <span
          className={`ml-1 transition transform inline-block ${
            showTags ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ArrowDown />
        </span>
      </button>
      <div
        className='p-2 mt-2 overflow-scroll border border-gray-300 border-solid rounded shadow-inner max-h-32'
        style={{
          transformOrigin: 'top center',
          ...(showTags ? { display: 'block' } : { display: 'none' })
        }}
      >
        <Checkbox
          label='All'
          id='all'
          first
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
