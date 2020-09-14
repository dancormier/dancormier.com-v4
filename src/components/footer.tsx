/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Text } from 'theme-ui'

function Footer(): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `,
  )
  const { author } = site.siteMetadata

  return (
    <footer>
      <Text
        color="gray"
        sx={{
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} {author}
      </Text>
    </footer>
  )
}

export default Footer
