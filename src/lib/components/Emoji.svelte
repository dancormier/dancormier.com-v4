<script lang="ts">
  import { emojiIndex, emojiList } from '$lib/emojiStore';

  let { animate = false, speed = 400 }: { animate?: boolean; speed?: number } = $props();

  $effect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      emojiIndex.update((i) => (i === emojiList.length - 1 ? 0 : i + 1));
    }, speed);
    return () => clearInterval(interval);
  });
</script>

<span class="emoji">{emojiList[$emojiIndex]}</span>

<style>
  .emoji {
    animation: wobble 3s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
    cursor: crosshair;
    display: inline-block;
    margin-left: 0.5rem;
  }

  @media (max-width: 831px) {
    .emoji {
      margin-left: 0;
      margin-bottom: 0.5rem;
    }
  }

  @keyframes wobble {
    0%   { transform: rotate(-10deg); }
    50%  { transform: rotate(15deg); }
    100% { transform: rotate(-10deg); }
  }
</style>
