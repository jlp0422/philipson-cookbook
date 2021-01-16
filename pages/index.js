import Head from '../components/Head'

const App = props => {
  return (
    <>
      <Head title='Philipson Cookbook' />
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div>my app</div>
    </>
  )
}

export default App
