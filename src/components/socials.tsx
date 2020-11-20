/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Box, Link } from 'theme-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import Tippy from '@tippyjs/react'

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
    case 'resume':
      return <FontAwesomeIcon icon={faFileAlt} />
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
            author
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
  const { author, social } = site.siteMetadata

  return (
    <Box {...props}>
      {social.map((s: SocialProps) => (
        <Tippy key={s.type} content={s.type} maxWidth="200" theme="custom">
          <Link
            aria-label={
              s.type !== 'email'
                ? `visit ${author}'s ${s.type}`
                : `email ${author}`
            }
            href={s.url}
            sx={{
              ml: [3, null, 0],
              mr: [3, null, 4],
            }}
          >
            {Icon(s.type)}
          </Link>
        </Tippy>
      ))}
    </Box>
  )
}

export default Socials
