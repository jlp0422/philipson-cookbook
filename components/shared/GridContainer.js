import React from 'react'

const GridContainer = ({ children, minWidth = '300px', maxWidth = '1fr' }) => (
  <div
    style={{
      gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, ${maxWidth}))`
    }}
    className='grid text-left gap-x-8 gap-y-8'
  >
    {children}
  </div>
)

export default GridContainer
