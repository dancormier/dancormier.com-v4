import * as React from 'react'
import { PageProps } from 'gatsby'
import Link from 'components/link'
import Layout from 'components/layout'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout {...props} title="404: Not Found">
      That page is nowhere to be found 🤷‍♂️. Wanna <Link to="/">go home</Link>?
    </Layout>
  )
}
