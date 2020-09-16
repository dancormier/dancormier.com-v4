import { base as theme } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(theme, {
  colors: {
    text: '#111',
    background: '#fff',
    primary: '#2215d8',
    secondary: '#6f66fb',
    muted: '#e8e9f9',
    highlight: '#6f66fb',
  },
  fonts: {
    body: `Inter, ${theme.fonts.body}`,
    sans: `Inter, ${theme.fonts.sans}`,
  },
  styles: {
    a: {
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
      color: 'highlight',
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
