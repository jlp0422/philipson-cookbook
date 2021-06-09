import { useState } from 'react'
import FilterIcon from '~/icons/Filter'
import FilterSlideout from './FilterSlideout'
import Button from '~/components/shared/Button'
import FormInput from '~/components/shared/form/FormInput'

const FilterBar = ({ searchQuery, setSearchQuery, ...props }) => {
  const [showFilters, setShowFilters] = useState(false)
  const closeFilters = () => setShowFilters(false)

  return (
    <section className='mb-4'>
      <div className='flex items-center'>
        <Button
          color='yellow'
          className='w-16 mr-4 sm:w-24 h-11'
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className='hidden sm:block'>Filters</span>
          <span className='block w-8 h-8 text-gray-100 transform rotate-90 sm:hidden'>
            <FilterIcon />
          </span>
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
      {showFilters && (
        <button
          className='fixed inset-0 w-full h-full overflow-hidden bg-gray-500 cursor-default opacity-40'
          onClick={closeFilters}
          tabIndex='-1'
        />
      )}

      <FilterSlideout
        {...props}
        showFilters={showFilters}
        close={closeFilters}
      />
    </section>
  )
}

export default FilterBar
