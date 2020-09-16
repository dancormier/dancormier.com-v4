/** @jsx jsx */
import * as React from 'react'
import { jsx, Box, Container } from 'theme-ui'
import Header from 'components/header'
import Footer from 'components/footer'
import SEO from 'components/seo'
import Socials from 'components/socials'

type LayoutProps = {
  children?: React.ReactNode
  title: string
  sx?: any
}

function Layout({
  children,
  title,
  ...props
}: LayoutProps): React.ReactElement {
  return (
    <Box
      sx={{
        pt: '25vh',
        textAlign: ['center', null, 'left'],
        ...props.sx,
      }}
      {...props}
    >
      <SEO title={title} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          maxWidth: 768,
        }}
      >
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          {children}
          <Socials
            sx={{
              fontSize: 5,
              pt: 2,
            }}
          />
        </Box>
        <Footer />
      </Container>
    </Box>
  )
}

export default Layout
