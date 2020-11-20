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
      sx={{
        color: 'link',
        '&:hover, &:focus': {
          color: 'highlight',
        },
      }}
    />
  )
}

export default Link
