import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <div
      className="
        h-full
        overflow-hidden
        rounded-full
        scale-100
        -scale-y-100
        shadow-lg
        transform
        w-full
        duration-200
        transition-all
        ease-in-out
        lg:filter-grayscale
        hover:filter-none
        lg:hover:scale-110
      "
    >
      <img
        src={avatar}
        aria-label={author}
        className="
          h-full
          object-fill
          w-full
        "
      />
    </div>
  )
}

export default AvatarDC
