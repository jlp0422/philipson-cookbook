const NakedX = ({ width = 'w-8', height = 'h-8' }) => (
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
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
)

export default NakedX
