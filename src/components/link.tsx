import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'

type LinkProps = {
  children?: React.ReactNode
  to: string
}

function Link({ ...props }: LinkProps): React.ReactElement {
  return (
    <GatsbyLink
      {...props}
      to={props.to}
      className="fc-green-500 h:fc-orange-500 f:fc-orange-500"
    />
  )
}

export default Link
