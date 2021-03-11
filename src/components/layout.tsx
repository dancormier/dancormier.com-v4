import * as React from 'react'
import { Global } from '@emotion/core'
import { useMediaQuery } from 'react-responsive'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { Box, Container } from 'theme-ui'

import Emoji, { EmojiIndexProvider } from 'components/emoji'
import EmojiBG from 'components/emojiBg'
import Header from 'components/header'
import Footer from 'components/footer'
import SEO from 'components/seo'
import Socials from 'components/socials'

import 'tippy.js/dist/tippy.css'

const endpoint = 'https://graphql.dancormier.com'

function useData() {
  return useQuery(['emojis', 'user'], async () => {
    const { emojis, user } = await request(
      endpoint,
      gql`
        query {
          emojis
          user(id: 23) {
            id
            name
            title
            location
            links {
              name
              url
            }
            jobs {
              name
              url
              end
            }
          }
        }
      `,
    )
    return { emojis, user }
  })
}

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
  const { status, data, isFetching } = useData()

  console.log(data?.emojis)
  return (
    <EmojiIndexProvider>
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
        <EmojiBG emojis={data?.emojis} />
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
          <Header
            emojis={data?.emojis}
            name={data?.user?.name}
            title={data?.user?.title}
          >
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
            <Emoji emojis={data?.emojis} animate={true} speed={800} />
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
