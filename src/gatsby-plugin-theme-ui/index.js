import { base as theme } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(theme, {
  colors: {
    background: '#20253c',
    text: '#faeae0',
    primary: '#f36c9c',
    secondary: '#10c785',
    link: '#10c785',
    highlight: '#f36c9c',
  },
  container: {
    maxWidth: 900,
  },
  fonts: {
    body: `Inter, ${theme.fonts.body}`,
    heading: `Fredoka One, ${theme.fonts.body}`,
  },
  styles: {
    a: {
      color: 'link',
      transition: '.1s',
      '&:hover, &:focus': {
        color: 'highlight',
      },
    },
    body: {
      color: 'text',
    },
    h1: {
      color: 'primary',
      fontFamily: 'heading',
      margin: 0,
      textTransform: 'uppercase',
    },
    h2: {
      color: 'secondary',
      fontFamily: 'heading',
      margin: 0,
      textTransform: 'uppercase',
    },
    p: {
      marginBlockEnd: 0,
      marginBlockStart: 0,
    },
  },
})
