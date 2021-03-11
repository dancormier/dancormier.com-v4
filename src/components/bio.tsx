import * as React from 'react'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { Box, Text, Link } from 'theme-ui'

// TODO: move to a const lib
const endpoint = 'https://graphql.dancormier.com'

function useBio() {
  return useQuery(['user'], async () => {
    const { user } = await request(
      endpoint,
      gql`
        query {
          user(id: 23) {
            id
            location
            jobs {
              name
              url
              end
            }
          }
        }
      `,
    )
    return user
  })
}

function Bio(): React.ReactElement {
  const { status, data, isFetching } = useBio()

  const job = data?.jobs.find((j: any) => j.end === null)

  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      {status === 'loading' || isFetching ? (
        'Loading...'
      ) : (
        <Text>
          I live in {data?.location} and work for{' '}
          <Link href={job?.url}>{job.name}</Link>.
        </Text>
      )}
    </Box>
  )
}

export default Bio
