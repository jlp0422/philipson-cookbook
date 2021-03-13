const divClass =
  'box-border block absolute w-16 h-16 m-2 border-8 border-solid rounded-full animate-loader'

const borderStyles = {
  borderTopColor: '#60A5FA',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: 'transparent'
}

const SIZES = {
  small: 'w-16 h-16',
  medium: 'w-20 h-20',
  large: 'w-24 h-24',
  xl: 'w-28 h-28'
}

const Loading = ({ size }) => {
  const delays = ['-0.45s', '-0.3s', '-0.15s', '0s']
  const sizes = SIZES[size]
  return (
    <div className={`relative flex items-center w-28 mx-auto my-2 h-28`}>
      {delays.map(animationDelay => (
        <div
          key={animationDelay}
          className={`${divClass} ${sizes}`}
          style={{ animationDelay, ...borderStyles }}
        ></div>
      ))}
    </div>
  )
}

export default Loading
