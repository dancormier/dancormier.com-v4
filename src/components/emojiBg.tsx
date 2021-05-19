import * as React from 'react'
// import { keyframes } from '@emotion/core'
import { Box } from 'theme-ui'
import { emojiList, useEmojiIndex } from 'components/emoji'

// const bgAni = keyframes({
//   '0%': { backgroundPosition: '0% 0%' },
//   '100%': { backgroundPosition: '0% 100%' },
// })

function EmojiBG(): React.ReactElement {
  const [emojiIndex] = useEmojiIndex()
  const emojiSize = 75
  const emojiStyle = `font-size:${
    emojiSize * 0.73
  }px; text-shadow: 1px 1px white`

  return (
    <Box
      className="d-block md:d-none ps-fixed h100 t0 w100 z-hide"
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
          emojiSize * 0.78
        } ${
          emojiSize * 0.83
        }'><foreignObject width='${emojiSize}px' height='${emojiSize}px'><div xmlns='http://www.w3.org/1999/xhtml' style='${emojiStyle}'>${
          emojiList[emojiIndex]
        }</div></foreignObject></svg>")`,
        backgroundSize: emojiSize,
        content: '""',
        filter: 'grayscale(0.5)',
        opacity: 0.03,
      }}
    />
  )
}

export default EmojiBG
