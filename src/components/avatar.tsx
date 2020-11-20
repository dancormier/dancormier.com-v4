import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, AspectRatio } from 'theme-ui'

function AvatarDC(): React.ReactElement {
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
      sx={theme => ({
        borderRadius: 400,
        boxShadow: [
          `0 0 2rem 0 ${theme?.colors?.primary}`,
          null,
          `0 0 2rem black`,
        ],
        filter: [
          null,
          null,
          'grayscale(1) opacity(70%) sepia(1) hue-rotate(-135deg)',
        ],
        opacity: [null, null, 0.7],
        overflow: 'hidden',
        transform: 'scale(-1, 1)',
        transition: '.2s',
        '&:hover': {
          boxShadow: `0 0 2rem 0 ${theme?.colors?.primary}`,
          filter: 'grayscale(0) opacity(100%) sepia(0) hue-rotate(0deg)',
          opacity: 1,
          transform: 'scale(-1.1, 1.1)',
        },
      })}
    >
      <AspectRatio
        ratio={1}
        sx={{
          backgroundImage: `url(${avatar})`,
          backgroundSize: 'cover',
        }}
        role="img"
        aria-label={`image of ${author}`}
      />
    </Container>
  )
}

export default AvatarDC
