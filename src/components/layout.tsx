import * as React from 'react'
import { Global, css } from '@emotion/core'
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
  const mqLg = useMediaQuery({ minWidth: 980 }) // TODO: use theme breakpoint here

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
        className="d-flex fd-column ff-sans fs-body3 overflow-scroll"
        style={{
          height: '100vh',
          maxHeight: '-webkit-fill-available',
          minHeight: '-webkit-fill-available',
        }}
        {...props}
      >
        <EmojiBG />
        <Global
          styles={{
            body: {
              height: '100vh',
              maxHeight: '-webkit-fill-available',
              minHeight: '-webkit-fill-available',
            },
            a: {
              color: 'var(--green-600) !important',
              textDecoration: 'underline !important',
              '&:hover, &:focus': {
                color: 'var(--yellow-700) !important',
              },
            },
            [tippyBoxClass]: {
              backgroundColor: 'var(--yellow-700)',
              border: '1px solid var(--yellow-700)',
              color: 'var(--white)',
            },
            [`${tippyBoxClass}[data-placement^='top'] > .tippy-arrow::before`]: {
              borderTopColor: 'var(--yellow-700)',
            },
            [`${tippyBoxClass}[data-placement^='bottom'] > .tippy-arrow::before`]: {
              borderBottomColor: 'var(--yellow-700)',
            },
          }}
        />
        <SEO title={title} />
        <Container
          className="ta-left md:ta-center"
          // Added to accomidate stacks
          css={css`
            padding-top: 25vh;
            @media (max-width: 980px) {
              padding-top: 10vh;
            }
          `}
        >
          <Header>
            <Box className="fl-grow1">
              {children}
              <Socials className="fs-headline2" />
            </Box>
          </Header>
        </Container>
        <Box className="fl-grow1" />
        {!mqLg && (
          <Container className="d-flex fs-display1 jc-center ta-center">
            <Emoji animate={true} speed={800} />
          </Container>
        )}
        <Footer
          className="ta-left sm:ta-center"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style={{ justifySelf: 'flex-end' }}
        />
      </Box>
    </EmojiIndexProvider>
  )
}

export default Layout
