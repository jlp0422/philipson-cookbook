const COLORS = {
  amber: [
    'bg-amber-500',
    'focus:ring-amber-400',
    'hover:bg-amber-700',
    'bg-amber-400'
  ],
  red: ['bg-red-500', 'focus:ring-red-400', 'hover:bg-red-700', 'bg-red-400'],
  green: [
    'bg-green-500',
    'focus:ring-green-400',
    'hover:bg-green-700',
    'bg-green-400'
  ],
  blue: [
    'bg-blue-500',
    'focus:ring-blue-400',
    'hover:bg-blue-700',
    'bg-blue-400'
  ]
}

const PADDING_X = {
  small: 'px-2',
  medium: 'px-4',
  large: 'px-6'
}

const Button = ({
  color,
  children,
  disabled,
  size = 'medium',
  onClick = () => {},
  type = 'button',
  className
}) => {
  const [buttonColor, focusColor, hoverColor, disabledColor] = COLORS[color]
  const dynamicColor = disabled ? disabledColor : `${buttonColor} ${hoverColor}`
  const paddingX = PADDING_X[size]
  return (
    <button
      disabled={disabled}
      className={`transition duration-500 ease-in-out transform ${paddingX} py-1 font-semibold text-white ${dynamicColor} rounded-lg shadow-md focus:outline-none focus:ring-2 ${focusColor} focus:ring-opacity-75 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
