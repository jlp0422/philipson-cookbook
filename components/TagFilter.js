import Checkbox from './shared/Checkbox'

const TagFilter = ({ tags, selectedTags, setSelectedTags }) => {
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
    <div>
      <h3>Recipe Tag</h3>
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
