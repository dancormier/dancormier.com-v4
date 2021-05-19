import * as React from 'react'
import { keyframes } from '@emotion/core'
import { Text } from 'theme-ui'

const EmojiIndexContext = React.createContext(0)

function useEmojiIndex(): number {
  const context = React.useContext(EmojiIndexContext)
  if (!context) {
    throw new Error(`useEmojiIndex must be used within a EmojiIndexProvider`)
  }
  return context
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function EmojiIndexProvider(props: any): React.ReactElement {
  const [emojiIndex, setEmojiIndex] = React.useState(0)
  const value = React.useMemo(() => [emojiIndex, setEmojiIndex], [emojiIndex])
  return <EmojiIndexContext.Provider value={value} {...props} />
}
export { EmojiIndexProvider, useEmojiIndex }

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
  '⚛️',
  '🥁',
  '💛',
  '🌹',
  '✊🏾',
  '🌈',
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
  '50%': { transform: 'rotate(15deg)' },
  '100%': { transform: 'rotate(-10deg)' },
})

type EmojiProps = {
  animate?: boolean
  className?: string
  sx?: any
  speed?: number
}

function Emoji({
  animate = false,
  className,
  speed = 400,
  ...props
}: EmojiProps): React.ReactElement {
  const [emojiIndex, setEmojiIndex] = useEmojiIndex()

  React.useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setEmojiIndex((prev: number) =>
          prev === emojiList.length - 1 ? 0 : prev + 1,
        )
      }, speed)
      return () => clearInterval(interval)
    }
  }, [animate])

  return (
    <Text
      className={`ml8 mb0 lg:ml8 lg:ml0 ${className}`}
      style={{
        cursor: 'crosshair',
      }}
      sx={{
        animation: `${rotateAni} 3s infinite cubic-bezier(0.25, 0.1, 0.25, 1)`,
        ...props.sx,
      }}
      {...props}
    >
      {emojiList[emojiIndex]}
    </Text>
  )
}

export default Emoji
