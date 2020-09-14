/** @jsx jsx */
import * as React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout'
import { jsx, Link, Text } from 'theme-ui'
import Socials from 'components/socials'

export default function Home(props: PageProps): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            location
            workplace {
              name
              url
            }
          }
        }
      }
    `,
  )
  const { location, workplace } = site.siteMetadata

  return (
    <Layout
      sx={{
        pt: '25vh',
        textAlign: ['center', null, 'left'],
      }}
      {...props}
      pageTitle="Home"
    >
      <Text
        as="p"
        sx={{
          fontSize: [1, null, 2],
          pt: 4,
        }}
      >
        I live in {location}. I work for
        {` `}
        <Link href={workplace.url}>{workplace.name}</Link>. 👋
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
