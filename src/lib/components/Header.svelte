<script lang="ts">
  import type { Snippet } from 'svelte';
  import Emoji from './Emoji.svelte';

  let { children }: { children?: Snippet } = $props();
  let animateEmoji = $state(false);
  let isMobile = $state(false);

  $effect(() => {
    const mq = window.matchMedia('(max-width: 831px)');
    isMobile = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });
</script>

<div class="header-wrap">
  <header class="header">
    <div class="header-text">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="name-row"
        onmouseenter={() => (animateEmoji = true)}
        onmouseleave={() => (animateEmoji = false)}
      >
        <h1>
          Dan Cormier
          <span class="emoji-desktop">
            <Emoji animate={animateEmoji} />
          </span>
        </h1>
        <h2>Frontend engineer</h2>
      </div>
      {@render children?.()}
    </div>
    <div class="avatar-wrap">
      <img
        src="/avatar.jpg"
        alt="Dan Cormier"
        class="avatar"
        width="200"
        height="200"
      />
    </div>
  </header>

  <div class="emoji-mobile">
    <Emoji animate={isMobile} speed={800} />
  </div>
</div>

<style>
  .header-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 10vh 1.5rem 0;
  }

  @media (min-width: 832px) {
    .header-wrap {
      padding-top: 25vh;
    }
  }

  .header {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: center;
  }

  @media (min-width: 832px) {
    .header {
      flex-direction: row;
      text-align: left;
    }
  }

  .header-text {
    flex: 1;
  }

  h1 {
    align-items: center;
    color: var(--color-primary);
    display: flex;
    font-family: var(--font-heading);
    font-size: clamp(3rem, 6vw, 4rem);
    justify-content: center;
    margin: 0;
    text-transform: uppercase;
  }

  @media (min-width: 832px) {
    h1 {
      justify-content: flex-start;
    }
  }

  h2 {
    color: var(--color-secondary);
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    margin: -0.5rem 0 0.5rem;
    text-transform: uppercase;
  }

  .header-text :global(p) {
    margin: 0 0 1.5rem;
  }

  .emoji-desktop {
    display: none;
  }

  @media (min-width: 832px) {
    .emoji-desktop {
      display: inline;
    }
  }

  .avatar-wrap {
    flex-shrink: 0;
    width: 40%;
    max-width: 200px;
  }

  @media (min-width: 832px) {
    .avatar-wrap {
      max-width: none;
      width: 30%;
    }
  }

  .avatar {
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 0 0 2rem 0 var(--color-primary);
    display: block;
    height: auto;
    object-fit: cover;
    transform: scale(-1, 1);
    transition: box-shadow 0.2s, filter 0.2s, transform 0.2s;
    width: 100%;
  }

  @media (min-width: 832px) {
    .avatar {
      box-shadow: 0 0 2rem black;
      filter: grayscale(1) brightness(60%) sepia(1) hue-rotate(-135deg);
    }

    .avatar:hover {
      box-shadow: 0 0 2rem 0 var(--color-primary);
      filter: none;
      transform: scale(-1.1, 1.1);
    }
  }

  .emoji-mobile {
    display: flex;
    font-size: 2.5rem;
    justify-content: center;
    margin-top: 1.5rem;
  }

  @media (min-width: 832px) {
    .emoji-mobile {
      display: none;
    }
  }
</style>
