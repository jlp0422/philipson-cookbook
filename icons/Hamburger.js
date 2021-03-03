const Hamburger = ({ width = 'w-8', height = 'h-8' }) => (
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
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
)

export default Hamburger

/* <svg className={`${width} ${height} fill-current`} viewBox='0 0 24 24'>
  <path
    fillRule='evenodd'
    d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
  />
</svg> */
