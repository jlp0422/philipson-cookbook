import Navigation from './Navigation'

const Layout = ({ title, children }) => {
  return (
    <>
      <Navigation title={title} />
      <main className='max-w-screen-xl mx-4 my-4 sm:mx-8 md:mx-12 lg:mx-16 2xl:mx-auto'>
        {children}
      </main>
    </>
  )
}

export default Layout
