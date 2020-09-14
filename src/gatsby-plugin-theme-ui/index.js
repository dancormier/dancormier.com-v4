import { tailwind } from '@theme-ui/presets'

const theme = tailwind

export default {
  ...theme,
  styles: {
    ...theme.styles,
    a: {
      ...theme.styles.a,
      transition: '.1s',
      '&:hover, &:focus': {
        color: 'highlight',
      },
    },
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'Ovo, serif',
    monospace: 'Menlo, monospace',
  },
  container: {
    maxWidth: 768,
    minHeight: '100vh',
  },
}
