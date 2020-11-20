import * as React from 'react'
import { keyframes } from '@emotion/core'
import { Text } from 'theme-ui'

export const emojiList = [
  '👋',
  '✌️',
  '🤟',
  '🤗',
  '🙂',
  '😎',
  '👨‍💻',
  '👨‍🌾',
  '👨‍🎨',
  '🥁',
  '💛',
  '🌹',
  '🌈',
  '✊🏾',
  '💯',
  '🚀',
  '⚡️',
  '🍳',
  '🍨',
  '🐶',
  '🐝',
  '🐞',
  '🐛',
  '🌻',
  '🌱',
  '🏔',
  '🏗',
  '📡',
]

const rotateAni = keyframes({
  '0%': { transform: 'rotate(-10deg)' },
  '50%': { transform: 'rotate(15deg)', transition: 'transform 0.3s ease-out' },
  '100%': { transform: 'rotate(-10deg)' },
})

type EmojiProps = {
  animate?: boolean
  sx?: any
  speed?: number
}

function Emoji({
  animate = false,
  speed = 400,
  ...props
}: EmojiProps): React.ReactElement {
  const [emojiIndex, setEmojiIndex] = React.useState(0)
  const intervalId = React.useRef()

  const rotateEmoji = React.useCallback(() => {
    intervalId.current = window.setInterval(() => {
      setEmojiIndex(prev => (prev === emojiList.length - 1 ? 0 : prev + 1))
    }, speed)
    return () => window.clearInterval(intervalId.current)
  }, [])

  React.useEffect(() => {
    if (!animate) {
      window.clearInterval(intervalId.current)
      return
    }
    rotateEmoji()
  }, [animate])

  return (
    <Text
      sx={{
        animation: `${rotateAni} 3s infinite linear`,
        cursor: 'crosshair',
        marginLeft: [0, null, 2],
        marginBottom: [2, null, 0],
        ...props.sx,
      }}
      {...props}
    >
      {emojiList[emojiIndex]}
    </Text>
  )
}

export default Emoji
