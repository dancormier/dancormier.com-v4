import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, AspectRatio } from 'theme-ui'

type AvatarProps = {
  className?: string
}

function AvatarDC({ className, ...props }: AvatarProps): React.ReactElement {
  const { file, site } = useStaticQuery(
    graphql`
      query {
        file(name: { eq: "avatar" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author
          }
        }
      }
    `,
  )
  const { author } = site.siteMetadata
  const { src: avatar } = file.childImageSharp.fixed

  return (
    <Container
      className={`bar-pill bs-lg overflow-hidden ${className}`}
      style={{
        transform: 'scale(-1, 1)',
      }}
      {...props}
    >
      <AspectRatio
        ratio={1}
        className="bg-cover"
        style={{
          backgroundImage: `url(${avatar})`,
        }}
        role="img"
        aria-label={`image of ${author}`}
      />
    </Container>
  )
}

export default AvatarDC
