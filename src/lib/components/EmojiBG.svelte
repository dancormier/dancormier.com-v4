<script lang="ts">
  import { emojiIndex, emojiList } from '$lib/emojiStore';

  const size = 75;
  const displaySize = size * 0.73;

  const bgImage = $derived.by(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size * 0.78} ${size * 0.83}'><foreignObject width='${size}px' height='${size}px'><div xmlns='http://www.w3.org/1999/xhtml' style='font-size:${displaySize}px;text-shadow:1px 1px white'>${emojiList[$emojiIndex]}</div></foreignObject></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  });
</script>

<div class="emoji-bg" style:background-image={bgImage}></div>

<style>
  .emoji-bg {
    animation: scroll-bg 80s infinite linear;
    background-size: 75px;
    display: none;
    filter: grayscale(0.5);
    height: 100%;
    left: 0;
    opacity: 0.03;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  @media (min-width: 832px) {
    .emoji-bg {
      display: block;
    }
  }

  @keyframes scroll-bg {
    0%   { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }
</style>
