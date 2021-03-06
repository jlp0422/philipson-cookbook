const PageHeader = ({ children, className }) => (
  <h1 className={`hidden sm:block text-2xl sm:text-4xl ${className}`}>{children}</h1>
)

export default PageHeader
