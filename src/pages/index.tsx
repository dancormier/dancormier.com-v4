/** @jsx jsx */
import * as React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout'
import { jsx, Heading, Link, Text } from 'theme-ui'
import SEO from 'components/seo'
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
  const { author, location, workplace } = site.siteMetadata

  return (
    <Layout
      sx={{
        pt: '25vh',
        textAlign: ['center', null, 'left'],
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
            fontSize: [6, null, 8],
          }}
        >
          {author}
        </Heading>
        <Heading
          as="h2"
          color="gray"
          sx={{
            fontSize: [4, null, 6],
            fontWeight: 400,
          }}
        >
          Front-end developer
        </Heading>
        <Text
          as="p"
          sx={{
            fontSize: 3,
            pt: [5, null, 4],
          }}
        >
          I live in {location}. I work for
          {` `}
          <Link href={workplace.url}>{workplace.name}</Link>.
        </Text>
        <Socials
          sx={{
            fontSize: [4, null, 5],
            pt: 5,
          }}
        />
      </div>
    </Layout>
  )
}
