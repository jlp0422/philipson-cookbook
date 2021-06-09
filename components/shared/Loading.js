const divClass =
  'box-border block absolute w-20 h-20 m-2 border-8 border-solid rounded-full animate-loader'

const borderStyles = color => ({
  borderTopColor: color,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: 'transparent'
})

const SIZES = {
  small: 'w-16 h-16',
  medium: 'w-20 h-20',
  large: 'w-24 h-24',
  xl: 'w-28 h-28'
}

const COLORS = {
  blue: '#2563EB',
  green: '#059669',
  red: '#EF4444',
  yellow: '#FCD34D',
  orange: '#F59E0B',
  white: '#FFFFFF'
}

const Loading = ({ size = 'medium', modifier = 'blue', styles }) => {
  const delays = ['-0.45s', '-0.3s', '-0.15s', '0s']
  const sizes = SIZES[size]
  const color = COLORS[modifier]
  return (
    <div className={`relative flex items-center w-28 mx-auto my-2 h-28 ${styles}`}>
      {delays.map(animationDelay => (
        <div
          key={animationDelay}
          className={`${divClass} ${sizes}`}
          style={{ animationDelay, ...borderStyles(color) }}
        ></div>
      ))}
    </div>
  )
}

export default Loading
