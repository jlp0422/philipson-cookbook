const ArrowDown = ({ width = 'h-5', height = 'h-5' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    className={`${width} ${height}`}
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      d='M19 14l-7 7m0 0l-7-7m7 7V3'
    />
  </svg>
)

export default ArrowDown
