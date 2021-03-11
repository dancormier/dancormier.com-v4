import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from 'components/layout'
import Bio from 'components/bio'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function Home(props: PageProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout {...props} title="Home">
        <Bio />
      </Layout>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
