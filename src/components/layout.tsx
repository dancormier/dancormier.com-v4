/** @jsx jsx */
import * as React from 'react'
import { Global } from '@emotion/core'
import { jsx, Box, Card, Container } from 'theme-ui'
import Header from 'components/header'
import Footer from 'components/footer'
import SEO from 'components/seo'
import Socials from 'components/socials'
import 'tippy.js/dist/tippy.css'

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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '25vh',
      }}
      {...props}
    >
      <Global
        styles={theme => ({
          a: {
            color: theme.colors.primary,
            fontWeight: 700,
            transition: '.1s',
            '&:hover, &:focus': {
              color: theme.colors.highlight,
            },
          },
        })}
      />
      <SEO title={title} />
      <Container
        sx={{
          textAlign: ['center', null, 'left'],
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
      </Container>
      <Box sx={{ flexGrow: 1 }} />
      <Footer
        sx={{
          justifySelf: 'flex-end',
          textAlign: ['center', null, 'left'],
        }}
      />
    </Box>
  )
}

export default Layout
