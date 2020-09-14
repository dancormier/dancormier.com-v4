/** @jsx jsx */
import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from 'components/layout'
import { jsx, Text } from 'theme-ui'
import Link from 'components/link'
import Socials from 'components/socials'

export default function Home(props: PageProps): React.ReactElement {
  return (
    <Layout
      sx={{
        textAlign: ['center', null, 'left'],
      }}
      {...props}
      pageTitle="404: Not Found"
    >
      <Text
        as="p"
        sx={{
          fontSize: [1, null, 2],
          pt: 4,
        }}
      >
        That page is nowhere to be found 🤷‍♂️. Wanna <Link to="/">go home</Link>?
      </Text>
      <Socials
        sx={{
          fontSize: [4, null, 5],
          pt: 4,
        }}
      />
    </Layout>
  )
}
