/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Container, Text } from 'theme-ui'

type FooterProps = {
  sx?: any
}

function Footer({ ...props }: FooterProps): React.ReactElement {
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
    <Container
      as="footer"
      sx={{
        py: 4,
        ...props.sx,
      }}
    >
      <Text
        color="gray"
        sx={{
          textAlign: ['center', null, 'left'],
        }}
      >
        © {new Date().getFullYear()} {author}
      </Text>
    </Container>
  )
}

export default Footer
