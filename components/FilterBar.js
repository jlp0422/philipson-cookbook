import { useState } from 'react'
import FilterSlideout from './FilterSlideout'
import Button from './shared/Button'
import FormInput from './shared/form/FormInput'

const FilterBar = ({ searchQuery, setSearchQuery, ...props }) => {
  const [showFilters, setShowFilters] = useState(false)
  const closeFilters = () => setShowFilters(false)

  return (
    <section className='mb-4'>
      {showFilters && (
        <div
          className='fixed left-0 z-10 w-full h-full bg-gray-500 opacity-40'
          onClick={closeFilters}
          style={{
            top: '56px'
          }}
        />
      )}
      <div className='flex items-center'>
        <Button
          color='yellow'
          className='mt-1 mr-4 w-36 h-11'
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </Button>
        <FormInput
          labelStyles='flex-grow'
          id='search'
          value={searchQuery}
          onChange={ev => setSearchQuery(ev.target.value)}
          placeholder='Search for a recipe'
        />
      </div>
      <div
        className='fixed right-0 z-20 w-2/5 h-screen transition duration-500 ease-in-out bg-gray-400 shadow-md'
        style={{
          top: '56px',
          transform: showFilters ? 'translateX(0)' : 'translateX(105%)'
        }}
      >
        <FilterSlideout {...props} close={closeFilters} />
      </div>
    </section>
  )
}

export default FilterBar
