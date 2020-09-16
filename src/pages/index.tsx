/** @jsx jsx */
import * as React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'
import md from 'snarkdown'
import Layout from 'components/layout'
import { jsx, Text } from 'theme-ui'

export default function Home(props: PageProps): React.ReactElement {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {
            sourceInstanceName: { eq: "content" }
            name: { eq: "index" }
          }
        ) {
          edges {
            node {
              childMarkdownRemark {
                frontmatter {
                  body
                }
              }
            }
          }
        }
      }
    `,
  )
  const { frontmatter } = allFile.edges[0].node.childMarkdownRemark
  const { body } = frontmatter

  return (
    <Layout {...props} title="Home">
      <Text
        as="p"
        sx={{
          fontSize: 2,
          pt: 4,
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: md(body) }} />
      </Text>
    </Layout>
  )
}
