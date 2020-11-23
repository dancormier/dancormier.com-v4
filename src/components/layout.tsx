import * as React from 'react'
import { Global, keyframes } from '@emotion/core'
import { useMediaQuery } from 'react-responsive'
import { Box, Container } from 'theme-ui'
import Emoji, {
  emojiList,
  EmojiIndexProvider,
  useEmojiIndex,
} from 'components/emoji'
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

const bgAni = keyframes({
  '0%': { transform: 'translateY(0%)' },
  '100%': { transform: 'translateY(50%)' },
})

function EmojiBG(): React.ReactElement {
  const [emojiIndex] = useEmojiIndex()
  const emojiSize = 60
  console.log(useEmojiIndex())
  return (
    <Box
      sx={{
        animation: `${bgAni} 60s infinite linear`,
        content: '""',
        display: 'block',
        position: 'absolute',
        height: '200%',
        width: '100%',
        background: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
          emojiSize * 0.78
        } ${
          emojiSize * 0.82
        }'><foreignObject width='${emojiSize}px' height='${emojiSize}px'><div xmlns='http://www.w3.org/1999/xhtml' style='font-size:${
          emojiSize * 0.73
        }px; text-shadow: 1px 1px white, -1px -1px black'>${
          emojiList[emojiIndex]
        }</div></foreignObject></svg>")`,
        backgroundSize: emojiSize,
        filter: 'grayscale(1)',
        opacity: 0.04,
        zIndex: -1,
        top: '-100%',
      }}
    />
  )
}

function Layout({
  children,
  title,
  ...props
}: LayoutProps): React.ReactElement {
  const mqLg = useMediaQuery({ minWidth: 832 }) // TODO: use theme breakpoint here

  return (
    <EmojiIndexProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '-webkit-fill-available',
          overflow: 'hidden',
          paddingTop: ['10vh', null, '25vh'],
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
              height: '98vh',
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
    </EmojiIndexProvider>
  )
}

export default Layout
