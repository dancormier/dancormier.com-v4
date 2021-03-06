import * as React from 'react'
import { PageProps, useStaticQuery, graphql } from 'gatsby'
import Layout from 'components/layout'

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
                html
                frontmatter {
                  type
                }
              }
            }
          }
        }
      }
    `,
  )
  const { html } = allFile.edges[0].node.childMarkdownRemark

  return (
    <Layout {...props} title="Home">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
