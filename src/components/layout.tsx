import * as React from 'react'
import { Global } from '@emotion/core'
import Helmet from 'react-helmet'
import { useMediaQuery } from 'react-responsive'
import { Box, Container } from 'theme-ui'
import Emoji, { EmojiIndexProvider } from 'components/emoji'
import EmojiBG from 'components/emojiBg'
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
    <EmojiIndexProvider>
      <Helmet
        bodyAttributes={{
          class: 'theme-system theme-dark',
        }}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/@stackoverflow/stacks/dist/css/stacks.min.css"
        />
        <script src="https://unpkg.com/@stackoverflow/stacks/dist/js/stacks.min.js" />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '-webkit-fill-available',
          minHeight: '-webkit-fill-available',
          overflow: 'scroll',
        }}
        {...props}
      >
        <EmojiBG />
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
            body: {
              maxHeight: '-webkit-fill-available',
              height: '100vh',
              minHeight: '-webkit-fill-available',
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
            paddingTop: ['10vh', null, '25vh'],
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
    </EmojiIndexProvider>
  )
}

export default Layout
