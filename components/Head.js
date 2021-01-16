import NextHead from 'next/head'

const Head = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link
        rel='shortcut icon'
        type='image/x-icon'
        href='/static/favicon.png'
      />
    </NextHead>
  )
}

export default Head
