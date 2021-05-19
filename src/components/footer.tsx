import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Text } from 'theme-ui'

type FooterProps = {
  className?: string
}

function Footer({ className, ...props }: FooterProps): React.ReactElement {
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
    <Container as="footer" className={`py12 ${className}`} {...props}>
      <Text className="fs-body1 ta-center">
        © {new Date().getFullYear()} {author}
      </Text>
    </Container>
  )
}

export default Footer
