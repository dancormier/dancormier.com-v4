import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Box, Link } from 'theme-ui'
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
  className?: string
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
  const { file, site } = useStaticQuery(
    graphql`
      query {
        file(name: { eq: "dan_cormier_resume_20210226" }) {
          publicURL
        }
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
  const { publicURL: resumePath } = file

  return (
    <Box {...props}>
      {social.map((s: SocialProps) => {
        const url = s.type === 'resume' ? resumePath : s.url
        const linkLabel =
          s.type !== 'email' ? `visit ${author}'s ${s.type}` : `email ${author}`

        return (
          <Tippy
            key={s.type}
            content={s.type}
            maxWidth="200"
            theme="custom"
            touch={false}
          >
            <Link
              aria-label={linkLabel}
              href={url}
              sx={{
                ml: [3, null, 0],
                mr: [3, null, 4],
              }}
            >
              {Icon(s.type)}
            </Link>
          </Tippy>
        )
      })}
    </Box>
  )
}

export default Socials
