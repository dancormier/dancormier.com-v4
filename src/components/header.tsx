import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import AvatarDC from './avatar'
import Emoji from './emoji'

type HeaderProps = {
  children?: React.ReactNode
}

function Header({ children }: HeaderProps): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            title
          }
        }
      }
    `,
  )
  const { author, title } = site.siteMetadata

  const [animateEmoji, setAnimateEmoji] = React.useState(false)
  const mqLg = useMediaQuery({ minWidth: 1024 })

  return (
    <div className="flex items-center flex-col-reverse lg:flex-row lg:justify-between max-w-screen-lg">
      <div className="mx-2 w-auto">
        <header
          onMouseEnter={() => setAnimateEmoji(true)}
          onMouseLeave={() => setAnimateEmoji(false)}
        >
          <h1
            className="
              flex
              flex-col-reverse
              font-display
              justify-center
              text-5xl
              text-pink-500
              uppercase
              lg:flex-row
              lg:justify-start
              lg:text-6xl
            "
          >
            <span>{author}</span>
            {mqLg && <Emoji animate={animateEmoji} />}
          </h1>
          <h2
            className="
              flex
              flex-col-reverse
              font-display
              justify-center
              text-2xl
              text-green-500
              uppercase
              lg:flex-row
              lg:justify-start
              lg:text-3xl
            "
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
      <div className="mb-4 w-2/5 lg:mb-0 lg:ml-12 lg:w-72">
        <AvatarDC />
      </div>
    </div>
  )
}

export default Header
