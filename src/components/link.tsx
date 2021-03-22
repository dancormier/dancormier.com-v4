import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'

type LinkProps = {
  children?: React.ReactNode
  external?: boolean
  className?: string
  to: string
}

function Link({ external, children, ...props }: LinkProps): React.ReactElement {
  const className = `cursor-pointer font-bold text-green-500 underline hover:text-pink-500 focus:text-pink-500 ${props.className}`
  return external ? (
    <a {...props} href={props.to} className={className}>
      {children}
    </a>
  ) : (
    <GatsbyLink {...props} to={props.to} className={className}>
      {children}
    </GatsbyLink>
  )
}

export default Link
