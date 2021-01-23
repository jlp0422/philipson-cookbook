import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className='mx-8 my-4 md:mx-12 lg:mx-16'>{children}</main>
    </>
  )
}

export default Layout
