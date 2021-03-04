import ArrowDown from '@/icons/ArrowDown'

const RotatingArrow = ({ flip }) => {
  return (
    <span
      className={`ml-1 w-5 h-5 transition transform inline-block ${
        flip ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <ArrowDown />
    </span>
  )
}

export default RotatingArrow
