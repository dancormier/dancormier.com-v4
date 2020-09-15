/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Container, Styled } from 'theme-ui'

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
    <Container as="header" {...props}>
      <Styled.h1 as="h1" sx={{ fontSize: [5, null, 7] }}>
        {author}
      </Styled.h1>
      <Styled.h2
        sx={{
          fontSize: [3, null, 5],
          fontWeight: 400,
          marginTop: 1,
        }}
      >
        {title}
      </Styled.h2>
    </Container>
  )
}

export default Header
