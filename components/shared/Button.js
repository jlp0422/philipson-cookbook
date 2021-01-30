const COLORS = {
  yellow: [
    'bg-yellow-500',
    'focus:ring-yellow-400',
    'hover:bg-yellow-700',
    'bg-yellow-400'
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

const Button = ({
  color,
  children,
  disabled,
  onClick,
  type = 'button',
  className
}) => {
  const [buttonColor, focusColor, hoverColor, disabledColor] = COLORS[color]
  return (
    <button
      disabled={disabled}
      className={`transition duration-500 ease-in-out transform px-4 py-1 font-semibold text-white ${
        disabled ? disabledColor : buttonColor
      } rounded-lg shadow-md focus:outline-none focus:ring-2 ${focusColor} focus:ring-opacity-75 ${
        disabled ? '' : hoverColor
      } ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
