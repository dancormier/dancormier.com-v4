/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Box, Heading } from 'theme-ui'

type HeaderProps = {
  children?: React.ReactNode
}

function Header({ ...props }: HeaderProps): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            title
          }
        }
      }
    `,
  )
  const { author, title } = site.siteMetadata

  return (
    <Box as="header" {...props}>
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
        color="secondary"
        sx={{
          fontSize: [4, null, 5],
          fontWeight: 400,
        }}
      >
        {title}
      </Heading>
    </Box>
  )
}

export default Header
