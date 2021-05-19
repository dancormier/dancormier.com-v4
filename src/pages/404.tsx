import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from 'components/layout'
import { Text } from 'theme-ui'
import Link from 'components/link'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout {...props} title="404: Not Found">
      <Text as="p" className="fs-body2 pt32 pb16">
        That page is nowhere to be found 🤷‍♂️. Wanna <Link to="/">go home</Link>?
      </Text>
    </Layout>
  )
}
