import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

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

function Socials(): React.ReactElement {
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
    <div>
      {social.map((s: SocialProps) => {
        const url = s.type === 'resume' ? resumePath : s.url
        const linkLabel =
          s.type !== 'email' ? `visit ${author}'s ${s.type}` : `email ${author}`

        return (
          <Link
            className="
              group
              inline-block
              mx-3
              relative
              text-4xl
              text-green-500
              lg:mr-6
              focus:text-pink-500
              hover:text-pink-500
            "
            key={s.type}
            aria-label={linkLabel}
            to={url}
            external
          >
            {Icon(s.type)}
            {/* TODO: Move this tooltip to it's own component */}
            <div
              className="
                absolute
                bg-pink-500
                bottom-full
                hidden
                left-0
                mb-2
                py-2
                px-3
                rounded
                text-sm
                text-white
                group-focus:block
                group-hover:block
              "
            >
              {s.type}
              <svg
                className="absolute text-pink-500 h-2 left-0 ml-3 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
              >
                <polygon
                  className="fill-current"
                  points="0,0 127.5,127.5 255,0"
                />
              </svg>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Socials
