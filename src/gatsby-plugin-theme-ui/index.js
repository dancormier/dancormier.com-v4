import { funk } from '@theme-ui/presets'

export default {
  ...funk,
  styles: {
    ...funk.styles,
    body: {
      height: '100vh',
    },
  },
  container: {
    maxWidth: 768,
    minHeight: '95vh',
  },
}
