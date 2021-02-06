import Head from '@/components/shared/Head'
import Layout from '@/components/shared/Layout'
import PageHeader from '@/components/shared/PageHeader'

const App = props => {
  return (
    <>
      <Head title='Philipson Cookbook' />
      <Layout>
        <PageHeader>Philipson Cookbook</PageHeader>
      </Layout>
    </>
  )
}

export default App
