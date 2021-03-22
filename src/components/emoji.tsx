import * as React from 'react'

const EmojiIndexContext = React.createContext(0)

function useEmojiIndex(): number {
  const context = React.useContext(EmojiIndexContext)
  if (!context) {
    throw new Error(`useEmojiIndex must be used within a EmojiIndexProvider`)
  }
  return context
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function EmojiIndexProvider({ children }: any): React.ReactElement {
  const [emojiIndex, setEmojiIndex] = React.useState(0)
  const value = React.useMemo(() => [emojiIndex, setEmojiIndex], [emojiIndex])

  return (
    <EmojiIndexContext.Provider value={value}>
      {children}
    </EmojiIndexContext.Provider>
  )
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

type EmojiProps = {
  animate?: boolean
  speed?: number
}

function Emoji({
  animate = false,
  speed = 400,
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
    <div className="animate-wave cursor-default mb-2 lg:mb-0 lg:ml-2 ">
      {emojiList[emojiIndex]}
    </div>
  )
}

export default Emoji
