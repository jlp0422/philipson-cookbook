const Button = ({
  color,
  children,
  disabled,
  onClick,
  type = 'button',
  className
}) => {
  const [buttonColor, focusColor, hoverColor] = [
    disabled ? `bg-${color}-400` : `bg-${color}-500`,
    `focus:ring-${color}-400`,
    `hover:bg-${color}-700`
  ]
  return (
    <button
      disabled={disabled}
      className={`transition duration-500 ease-in-out transform px-4 py-1 font-semibold text-white ${buttonColor} rounded-lg shadow-md focus:outline-none focus:ring-2 ${focusColor} focus:ring-opacity-75 ${disabled ? '' : hoverColor} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
