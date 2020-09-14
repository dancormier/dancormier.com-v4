/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Box, IconButton, Link } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

type SocialsProps = {
  children?: React.ReactNode
}

type SocialProps = {
  name: string
  type: string
  url: string
}

const Icon = (type: string) => {
  switch (type) {
    case 'github':
      return <FontAwesomeIcon icon={faGithub} />
    case 'linkedin':
      return <FontAwesomeIcon icon={faLinkedin} />
    case 'twitter':
      return <FontAwesomeIcon icon={faTwitter} />
    default:
      return <FontAwesomeIcon icon={faPaperPlane} />
  }
}

function Socials({ ...props }: SocialsProps): React.ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              name
              url
              type
            }
          }
        }
      }
    `,
  )
  const { social } = site.siteMetadata

  return (
    <Box {...props}>
      {social.map((s: SocialProps) => (
        <Link
          key={s.type}
          href={s.url}
          sx={{
            mr: 3,
          }}
        >
          {Icon(s.type)}
        </Link>
      ))}
    </Box>
  )
}

export default Socials
