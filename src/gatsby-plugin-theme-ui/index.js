import { base as theme } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(theme, {
  colors: {
    text: '#111',
    background: '#fff',
    primary: '#f0471a',
    secondary: '#6f66fb',
    highlight: '#6f66fb',
  },
  container: {
    maxWidth: 768,
  },
  fonts: {
    body: `Inter, ${theme.fonts.body}`,
    sans: `Inter, ${theme.fonts.sans}`,
  },
  styles: {
    a: {
      color: 'primary',
      transition: '.1s',
      '&:hover, &:focus': {
        color: 'secondary',
      },
    },
    h1: {
      fontWeight: '900',
      margin: 0,
      textTransform: 'uppercase',
    },
    h2: {
      color: 'primary',
      fontWeight: '300',
      margin: 0,
      textTransform: 'uppercase',
    },
    p: {
      marginBlockEnd: 0,
      marginBlockStart: 0,
    },
  },
})
