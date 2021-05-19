import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Container, Heading, Text } from 'theme-ui'
import AvatarDC from './avatar'
import Emoji from './emoji'

type HeaderProps = {
  children?: React.ReactNode
}

function Header({ children, ...props }: HeaderProps): React.ReactElement {
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
  const mqLg = useMediaQuery({ minWidth: 980 }) // TODO: use theme breakpoint here

  return (
    <Container
      className="ai-center d-flex fd-row md:fd-column-reverse"
      {...props}
    >
      <Container className="mx8 w-auto">
        <Container
          as="header"
          onMouseEnter={() => setAnimateEmoji(true)}
          onMouseLeave={() => setAnimateEmoji(false)}
        >
          <Heading
            as="h1"
            className="d-flex fc-yellow-700 fs-display3 md:fd-row tt-uppercase jc-center"
          >
            <Text>{author}</Text>
            {mqLg && <Emoji animate={animateEmoji} />}
          </Heading>
          <Heading as="h2" className="fc-green-600 tt-uppercase fs-headline2">
            {title}
          </Heading>
        </Container>
        <Container className="mt12">{children}</Container>
      </Container>
      <Container
        // md:w40 doesn't exist
        className="mb0 md:mb16 w30 md:w40"
      >
        <AvatarDC />
      </Container>
    </Container>
  )
}

export default Header
