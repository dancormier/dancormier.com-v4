/** @jsx jsx */
import * as React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout'
import { jsx, Heading, Link, Text } from 'theme-ui'
import SEO from 'components/seo'

export default function Home(props: PageProps): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            location
            social {
              name
              url
              type
            }
            workplace {
              name
              url
            }
          }
        }
      }
    `,
  )
  const { author, location, social, workplace } = site.siteMetadata

  return (
    <Layout
      sx={{
        display: [null, null, null, 'flex'],
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      {...props}
    >
      <SEO title="Home" />
      <div
        sx={{
          minHeight: '33vh',
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: [6, null, null, 7],
          }}
        >
          {author}
        </Heading>
        <Heading as="h2">Front-end developer</Heading>
        <Text
          as="p"
          sx={{
            py: 4,
          }}
        >
          I live in {location}. I work for
          {` `}
          <Link href={workplace.url}>{workplace.name}</Link>.
        </Text>
      </div>
    </Layout>
  )
}
