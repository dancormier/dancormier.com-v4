import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <div className="py-3 text-center text-sm">
      © {new Date().getFullYear()} {author}
    </div>
  )
}

export default Footer
