/** @jsx jsx */
import * as React from 'react'
import { jsx, Box, Container } from 'theme-ui'
import Header from 'components/header'
import Footer from 'components/footer'
import SEO from 'components/seo'

type LayoutProps = {
  children?: React.ReactNode
  pageTitle: string
  sx?: any
}

function Layout({
  children,
  pageTitle,
  ...props
}: LayoutProps): React.ReactElement {
  return (
    <Container
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        ...props.sx,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <SEO title={pageTitle} />
        <Header />
        {children}
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout
