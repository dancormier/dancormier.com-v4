import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Text } from 'theme-ui'

type FooterProps = {
  sx?: any
}

function Footer(props: FooterProps): React.ReactElement {
  const { graphqldc } = useStaticQuery(
    graphql`
      query {
        graphqldc {
          user(id: 23) {
            name
          }
        }
      }
    `,
  )
  const { user } = graphqldc

  return (
    <Container
      as="footer"
      sx={{
        py: 3,
        ...props.sx,
      }}
    >
      <Text
        sx={{
          fontSize: 1,
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} {user?.name}
      </Text>
    </Container>
  )
}

export default Footer
