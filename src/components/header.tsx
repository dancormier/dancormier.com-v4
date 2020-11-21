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
  const mqLg = useMediaQuery({ minWidth: 832 }) // TODO: use theme breakpoint here

  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: ['column-reverse', null, 'row'],
      }}
      {...props}
    >
      <Container
        sx={{
          marginX: '2',
          width: 'auto',
        }}
      >
        <Container
          as="header"
          onMouseEnter={() => setAnimateEmoji(true)}
          onMouseLeave={() => setAnimateEmoji(false)}
        >
          <Heading
            as="h1"
            sx={theme => ({
              ...theme?.styles?.h1,
              display: 'flex',
              flexDirection: ['column-reverse', null, 'row'],
              fontSize: [6, null, 7],
              justifyContent: ['center', null, 'flex-start'],
            })}
          >
            <Text>{author}</Text>
            {mqLg && <Emoji animate={animateEmoji} />}
          </Heading>
          <Heading
            as="h2"
            sx={theme => ({
              ...theme?.styles?.h2,
              fontSize: [4, null, 5],
            })}
          >
            {title}
          </Heading>
        </Container>
        {children}
      </Container>
      <Container
        sx={{
          marginBottom: [4, null, 0],
          width: ['40%', null, '30%'],
        }}
      >
        <AvatarDC />
      </Container>
    </Container>
  )
}

export default Header
