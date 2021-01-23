const getColors = color => [
  `bg-${color}-500`,
  `focus:ring-${color}-400`,
  `hover:bg-${color}-700`
]

const Button = ({
  color,
  children,
  disabled,
  onClick,
  type = 'button',
  className
}) => {
  const [buttonColor, focusColor, hoverColor] = getColors(color)
  return (
    <button
      disabled={disabled}
      className={`px-4 py-1 font-semibold text-white ${buttonColor} rounded-lg shadow-md focus:outline-none focus:ring-2 ${focusColor} focus:ring-opacity-75 ${
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
