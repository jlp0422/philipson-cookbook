import { useState } from 'react'
import FilterSlideout from './FilterSlideout'
import Button from './shared/Button'
import FormInput from './shared/form/FormInput'

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
          <span className='flex justify-center items-center mb-0.5 text-2xl sm:hidden text-gray-100'>
            <svg
              id='filter'
              className='fill-current w-7 h-7'
              viewBox='0 0 512 512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M420.404 0H91.596C41.09 0 0 41.09 0 91.596v328.809C0 470.91 41.09 512 91.596 512h328.809C470.91 512 512 470.91 512 420.404V91.596C512 41.09 470.91 0 420.404 0zM482 420.404C482 454.368 454.368 482 420.404 482H91.596C57.632 482 30 454.368 30 420.404V91.596C30 57.632 57.632 30 91.596 30h328.809C454.368 30 482 57.632 482 91.596z' />
              <path d='M432.733 112.467H204.272c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133H79.267c-8.284 0-15 6.716-15 15s6.716 15 15 15h35.662c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h228.461c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zM159.6 144.6c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133S169.047 144.6 159.6 144.6zM432.733 241h-35.662c-6.281-18.655-23.927-32.133-44.672-32.133s-38.39 13.478-44.671 32.133H79.267c-8.284 0-15 6.716-15 15s6.716 15 15 15h228.461c6.281 18.655 23.927 32.133 44.672 32.133s38.391-13.478 44.672-32.133h35.662c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zM352.4 273.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133zM432.733 369.533H268.539c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133H79.267c-8.284 0-15 6.716-15 15s6.716 15 15 15h99.928c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h164.195c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-208.866 32.134c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133S241 375.086 241 384.533s-7.686 17.134-17.133 17.134z' />
            </svg>
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
