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
          className='w-16 mt-1 mr-4 sm:w-24 h-11'
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className='hidden sm:block'>
            {/*{showFilters ? 'Hide' : 'Show'} */}Filters
          </span>
          <span className='block mb-0.5 text-2xl sm:hidden'>&#9776;</span>
        </Button>
        <FormInput
          labelStyles='flex-grow relative'
          id='search'
          value={searchQuery}
          onChange={ev => setSearchQuery(ev.target.value)}
          placeholder='Search for a recipe'
          onClear={() => setSearchQuery('')}
        />
      </div>
      <div
        className='fixed right-0 z-20 w-3/4 h-screen transition duration-500 ease-in-out bg-gray-400 shadow-md sm:w-3/5 md:w-1/2 lg:2/5'
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
