import TagFilter from './TagFilter'

const Sidebar = ({ selectedTags, setSelectedTags }) => {
  return (
    <section>
      <h2>Filters</h2>
      <TagFilter
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </section>
  )
}

export default Sidebar
