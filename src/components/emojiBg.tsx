import * as React from 'react'
import { keyframes } from '@emotion/core'
import { Box } from 'theme-ui'
import { emojiList, useEmojiIndex } from 'components/emoji'

const bgAni = keyframes({
  '0%': { backgroundPosition: '0% 0%' },
  '100%': { backgroundPosition: '0% 100%' },
})

function EmojiBG(): React.ReactElement {
  const [emojiIndex] = useEmojiIndex()
  const emojiSize = 75
  const emojiStyle = `font-size:${
    emojiSize * 0.73
  }px; text-shadow: 1px 1px white`

  return (
    <Box
      sx={{
        animation: `${bgAni} 80s infinite linear`,
        content: '""',
        display: ['none', null, 'block'],
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundSize: emojiSize,
        filter: 'grayscale(0.5)',
        opacity: 0.03,
        zIndex: -1,
        top: 0,
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
          emojiSize * 0.78
        } ${
          emojiSize * 0.83
        }'><foreignObject width='${emojiSize}px' height='${emojiSize}px'><div xmlns='http://www.w3.org/1999/xhtml' style='${emojiStyle}'>${
          emojiList[emojiIndex]
        }</div></foreignObject></svg>")`,
      }}
    />
  )
}

export default EmojiBG
