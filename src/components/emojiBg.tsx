import * as React from 'react'
import { emojiList, useEmojiIndex } from 'components/emoji'

function EmojiBG(): React.ReactElement {
  const [emojiIndex] = useEmojiIndex()
  const emojiSize = 75
  const emojiStyle = `font-size:${
    emojiSize * 0.73
  }px; text-shadow: 1px 1px white`

  return (
    <div
      className="
        animate-scroll
        filter-grayscale-50
        fixed
        h-full
        top-0
        w-full
        z-0
      "
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
          emojiSize * 0.78
        } ${
          emojiSize * 0.83
        }'><foreignObject width='${emojiSize}px' height='${emojiSize}px'><div xmlns='http://www.w3.org/1999/xhtml' style='${emojiStyle}'>${
          emojiList[emojiIndex]
        }</div></foreignObject></svg>")`,
        backgroundSize: `${emojiSize}px`,
        opacity: 0.03,
      }}
    />
  )
}

export default EmojiBG
