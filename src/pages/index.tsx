import * as React from 'react'
import { PageProps } from 'gatsby'
import Link from 'components/link'
import Layout from 'components/layout'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout {...props} title="Home">
      I live in Florida and work for{' '}
      <Link external to="https://ted.com">
        TED
      </Link>
      .
    </Layout>
  )
}
