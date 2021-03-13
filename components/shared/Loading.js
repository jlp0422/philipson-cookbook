const divClass =
  'box-border block absolute w-16 h-16 m-2 border-8 border-solid rounded-full animate-loader'

const borderStyles = {
  borderTopColor: '#60A5FA',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: 'transparent'
}

const Loading = () => {
  const delays = ['-0.45s', '-0.3s', '-0.15s', '0s']
  return (
    <div className='relative flex items-center w-20 mx-auto my-2 h-28'>
      {delays.map(animationDelay => (
        <div
          key={animationDelay}
          className={divClass}
          style={{ animationDelay, ...borderStyles }}
        ></div>
      ))}
    </div>
  )
}

export default Loading
