/** @jsx jsx */
import * as React from 'react'
import { jsx } from 'theme-ui'
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
      sx={{
        color: 'primary',
        '&:hover, &:focus': {
          color: 'secondary',
        },
      }}
    />
  )
}

export default Link
