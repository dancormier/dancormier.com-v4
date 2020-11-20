import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from 'components/layout'
import { Text } from 'theme-ui'
import Link from 'components/link'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout {...props} title="404: Not Found">
      <Text
        as="p"
        sx={{
          fontSize: 2,
          pt: 4,
        }}
      >
        That page is nowhere to be found 🤷‍♂️. Wanna <Link to="/">go home</Link>?
      </Text>
    </Layout>
  )
}
