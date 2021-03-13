import Head from '~/components/shared/Head'
import Layout from '~/components/shared/Layout'
import PageHeader from '~/components/shared/PageHeader'

const App = () => {
  const pageTitle = 'Philipson Cookbook'
  return (
    <>
      <Head title={pageTitle} />
      <Layout title={pageTitle}>
        <PageHeader>{pageTitle}</PageHeader>
      </Layout>
    </>
  )
}

export default App
