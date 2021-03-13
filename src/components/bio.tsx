import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Text } from 'theme-ui'

// TODO: Import types from graphql endpoint
const getCurrentJob = jobs => jobs.find(job => job.end === null)

function Bio(): React.ReactElement {
  const { graphqldc } = useStaticQuery(
    graphql`
      query {
        graphqldc {
          user(id: 23) {
            jobs {
              name
              url
              end
            }
            location
          }
        }
      }
    `,
  )

  const { user } = graphqldc
  const job = getCurrentJob(user?.jobs)
  const { location } = user

  return (
    <Text>
      I live in {location}
      {job && (
        <>
          {' '}
          and work at <a href={job.url}>{job.name}</a>
        </>
      )}
      .
    </Text>
  )
}

export default Bio
