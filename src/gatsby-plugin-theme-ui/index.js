import { base as theme } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(theme, {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: '#f6f6f6',
  },
  fonts: {
    body: `Inter, ${theme.fonts.body}`,
    sans: `Inter, ${theme.fonts.sans}`,
  },
  styles: {
    a: {
      transition: '.1s',
      '&:hover, &:focus': {
        color: 'highlight',
      },
    },
    h1: {
      fontWeight: '900',
      margin: 0,
      textTransform: 'uppercase',
    },
    h2: {
      color: 'gray',
      fontWeight: '300',
      margin: 0,
      textTransform: 'uppercase',
    },
  },
})
