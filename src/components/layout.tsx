import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import Emoji, { EmojiIndexProvider } from 'components/emoji'
import EmojiBG from 'components/emojiBg'
import Header from 'components/header'
import Footer from 'components/footer'
import SEO from 'components/seo'
import Socials from 'components/socials'
// import 'tippy.js/dist/tippy.css'

type LayoutProps = {
  children?: React.ReactNode
  title: string
}

function Layout({ children, title }: LayoutProps): React.ReactElement {
  const mqLg = useMediaQuery({ minWidth: 1024 })

  return (
    <EmojiIndexProvider>
      <div
        className="
          bg-gray-900
          flex
          flex-col
          h-screen
          overflow-scroll
          text-white
        "
        style={{
          maxHeight: '-webkit-fill-available',
          minHeight: '-webkit-fill-available',
        }}
      >
        <EmojiBG />
        <SEO title={title} />
        <div
          className="
            flex
            flex-grow
            h-3/4
            items-center
            justify-center
            relative
            text-center
            lg:h-2/3
            lg:text-left
            z-1
          "
        >
          <Header>
            <div className="flex flex-col flex-grow">
              {children && (
                <div className="font-lg my-2 lg:my-5">{children}</div>
              )}
              <Socials />
            </div>
          </Header>
        </div>
        <footer
          className="
            justify-end
            flex
            flex-col
            flex-grow
            h-1/4
            relative
            z-1
            lg:h-1/3
          "
        >
          <div
            className="
              opacity-100
              flex
              justify-center
              text-6xl
              text-center
              lg:opacity-0
            "
          >
            <Emoji animate={!mqLg} speed={800} />
          </div>
          <Footer />
        </footer>
      </div>
    </EmojiIndexProvider>
  )
}

export default Layout
