/** @jsx jsx */
import * as React from 'react'
import { jsx, Container } from 'theme-ui'
import Footer from 'components/footer'

type LayoutProps = {
  children?: React.ReactNode
  sx?: any
}

function Layout({ children, ...props }: LayoutProps): React.ReactElement {
  return (
    <Container
      p={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 4,
        pt: 4,
        ...props.sx,
      }}
      {...props}
    >
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
