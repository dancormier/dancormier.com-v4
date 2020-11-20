import * as React from 'react'
import { Global } from '@emotion/core'
import { useMediaQuery } from 'react-responsive'
import { Box, Container } from 'theme-ui'
import Emoji from 'components/emoji'
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

const customTippyTheme = 'custom'
const tippyBoxClass = `.tippy-box[data-theme~='${customTippyTheme}']`

function Layout({
  children,
  title,
  ...props
}: LayoutProps): React.ReactElement {
  const mqLg = useMediaQuery({ minWidth: 832 }) // TODO: use theme breakpoint here

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: ['10vh', null, '25vh'],
      }}
      {...props}
    >
      <Global
        styles={theme => ({
          a: {
            color: theme.colors.link,
            fontWeight: 700,
            transition: '.1s',
            '&:hover, &:focus': {
              color: theme.colors.highlight,
            },
          },
          p: {
            marginBlockEnd: theme.space[3],
            marginBlockStart: theme.space[3],
          },
          [tippyBoxClass]: {
            backgroundColor: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}`,
          },
          [`${tippyBoxClass}[data-placement^='top'] > .tippy-arrow::before`]: {
            borderTopColor: theme.colors.primary,
          },
          [`${tippyBoxClass}[data-placement^='bottom'] > .tippy-arrow::before`]: {
            borderBottomColor: theme.colors.primary,
          },
        })}
      />
      <SEO title={title} />
      <Container
        sx={{
          textAlign: ['center', null, 'left'],
        }}
      >
        <Header>
          <Box sx={{ flexGrow: 1 }}>
            {children}
            <Socials
              sx={{
                fontSize: 5,
              }}
            />
          </Box>
        </Header>
      </Container>
      <Box sx={{ flexGrow: 1 }} />
      {!mqLg && (
        <Container
          sx={{
            display: ['flex', null, 'none'],
            fontSize: 6,
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Emoji animate={true} speed={800} />
        </Container>
      )}
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
