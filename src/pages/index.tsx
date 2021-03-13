import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from 'components/layout'
import Bio from 'components/bio'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout {...props} title="Home">
      <Bio />
    </Layout>
  )
}
