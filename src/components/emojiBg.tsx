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
  const emojiSize = 50

  console.log()
  return (
    <Box
      sx={{
        animation: `${bgAni} 60s infinite linear`,
        content: '""',
        display: 'block',
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundSize: emojiSize,
        filter: 'grayscale(1)',
        opacity: 0.04,
        zIndex: -1,
        top: 0,
      }}
      style={{
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
          emojiSize * 0.78
        } ${
          emojiSize * 0.82
        }'><foreignObject width='${emojiSize}px' height='${emojiSize}px'><div xmlns='http://www.w3.org/1999/xhtml' style='font-size:${
          emojiSize * 0.73
        }px; text-shadow: 1px 1px white, -1px -1px black'>${
          emojiList[emojiIndex]
        }</div></foreignObject></svg>")`,
      }}
    />
  )
}

export default EmojiBG
