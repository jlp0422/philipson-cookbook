import dynamic from 'next/dynamic'
import Navigation from './Navigation'

// const Navigation = dynamic(() => import('./Navigation'))

const Layout = ({ title, children }) => {
  return (
    <>
      <Navigation title={title} />
      <main className='mx-4 my-4 max-w-screen-xl sm:mx-8 md:mx-12 lg:mx-16 2xl:mx-auto'>
        {children}
      </main>
    </>
  )
}

export default Layout
