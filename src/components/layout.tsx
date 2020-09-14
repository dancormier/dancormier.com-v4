/** @jsx jsx */
import * as React from 'react'
import { jsx, Container } from 'theme-ui'

type LayoutProps = {
  children?: React.ReactNode
}

function Layout({ children, ...props }: LayoutProps): React.ReactElement {
  return (
    <Container p={4} {...props}>
      {children}
    </Container>
  )
}

export default Layout
