# SvelteKit Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild dancormier.com-v4 from Gatsby 3 to SvelteKit, preserving the existing visual design and emoji features with zero CMS or analytics overhead.

**Architecture:** SvelteKit 2 + Svelte 5 + TypeScript deployed via adapter-netlify. Scoped Svelte CSS with CSS variables replaces Theme UI. Emoji index shared across components via a Svelte writable store (replaces React Context). All content hardcoded — no GraphQL, no CMS.

**Tech Stack:** SvelteKit 2, Svelte 5, TypeScript, @sveltejs/adapter-netlify, @fortawesome/fontawesome-svg-core + free-brands + free-solid, Vitest, @testing-library/svelte

---

## File Map

| Path | Purpose |
|------|---------|
| `package.json` | New minimal dep set — replaces Gatsby stack |
| `svelte.config.js` | SvelteKit + adapter-netlify |
| `vite.config.ts` | Vite + Vitest config |
| `tsconfig.json` | TypeScript (extends `.svelte-kit/tsconfig.json`) |
| `src/app.html` | SvelteKit shell — Google Fonts `<link>` lives here |
| `src/app.css` | CSS variables (colors, fonts), global resets |
| `src/lib/emojiStore.ts` | Writable store: `emojiIndex` + `emojiList` |
| `src/lib/emojiStore.test.ts` | Unit tests for the store |
| `src/lib/components/Emoji.svelte` | Animated emoji; advances store when `animate` prop is true |
| `src/lib/components/Emoji.test.ts` | Component tests |
| `src/lib/components/EmojiBG.svelte` | Tiled scrolling bg, desktop only |
| `src/lib/components/Header.svelte` | Name, subtitle, avatar, emoji |
| `src/lib/components/Socials.svelte` | FA icon links + CSS tooltips |
| `src/lib/components/Footer.svelte` | Copyright line |
| `src/routes/+layout.svelte` | Root layout — EmojiBG, Footer, imports app.css |
| `src/routes/+page.svelte` | Home — hardcoded bio + Socials |
| `src/routes/+error.svelte` | 404 |
| `static/avatar.jpg` | Profile photo (copied from content/assets/) |
| `netlify.toml` | Build command + publish dir |

---

### Task 1: Clean up repo — remove Gatsby files, copy avatar

**Files:**
- Delete: `src/pages/`, `src/components/`, `src/gatsby-plugin-theme-ui/`, `gatsby-config.js`, `content/`, `static/admin/`, `package-lock.json`, `yarn.lock`, `public/`
- Create: `static/avatar.jpg`, dir `src/lib/components/`, `src/routes/`

- [ ] **Step 1: Copy avatar to static/**

```bash
cp content/assets/avatar.jpg static/avatar.jpg
mkdir -p src/lib/components src/routes
```

- [ ] **Step 2: Remove old Gatsby source via git rm**

```bash
git rm -r src/pages src/components src/gatsby-plugin-theme-ui gatsby-config.js
```

- [ ] **Step 3: Remove content dir, old static dirs, lock files**

```bash
git rm -r content/ static/admin/ static/assets/ public/ 2>/dev/null || true
rm -f package-lock.json yarn.lock
```

- [ ] **Step 4: Update .gitignore for SvelteKit**

Replace the entire contents of `.gitignore`:

```
# Dependencies
node_modules/

# SvelteKit
.svelte-kit/
build/

# Environment
.env
.env.*
!.env.example

# Editor
.DS_Store

# Superpowers brainstorming sessions
.superpowers/
```

- [ ] **Step 5: Commit**

```bash
git add static/avatar.jpg .gitignore
git commit -m "chore: strip gatsby source, copy avatar to static"
```

---

### Task 2: SvelteKit scaffold — package.json + config files

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`

- [ ] **Step 1: Write package.json**

```json
{
  "name": "dancormier.com-v4",
  "private": true,
  "version": "5.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-brands-svg-icons": "^6.7.2",
    "@fortawesome/free-solid-svg-icons": "^6.7.2"
  },
  "devDependencies": {
    "@sveltejs/adapter-netlify": "^4.4.1",
    "@sveltejs/kit": "^2.21.1",
    "@sveltejs/vite-plugin-svelte": "^5.0.3",
    "@testing-library/svelte": "^5.2.7",
    "jsdom": "^26.1.0",
    "svelte": "^5.28.2",
    "svelte-check": "^4.1.5",
    "typescript": "^5.8.3",
    "vitest": "^3.1.2"
  }
}
```

- [ ] **Step 2: Write svelte.config.js**

```js
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

- [ ] **Step 3: Write vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    globals: true,
  },
});
```

- [ ] **Step 4: Write tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibChecks": true,
    "sourceMap": true,
    "strict": true
  }
}
```

- [ ] **Step 5: Install dependencies with pnpm**

```bash
pnpm install
```

Expected: `node_modules/` and `pnpm-lock.yaml` created.

- [ ] **Step 6: Generate .svelte-kit/ (needed for tsconfig extend)**

```bash
pnpm exec svelte-kit sync
```

Expected: `.svelte-kit/tsconfig.json` created.

- [ ] **Step 7: Commit**

```bash
git add package.json svelte.config.js vite.config.ts tsconfig.json pnpm-lock.yaml
git commit -m "chore: scaffold sveltekit + install deps"
```

---

### Task 3: Global styles — app.html + app.css

**Files:**
- Create: `src/app.html`, `src/app.css`

- [ ] **Step 1: Write src/app.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/avatar.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 2: Write src/app.css**

```css
:root {
  --color-bg: #20253c;
  --color-text: #faeae0;
  --color-primary: #f36c9c;
  --color-secondary: #10c785;
  --color-link: #10c785;
  --color-highlight: #f36c9c;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Fredoka One', system-ui, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  min-height: 100dvh;
}

a {
  color: var(--color-link);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.1s;
}

a:hover,
a:focus {
  color: var(--color-highlight);
}

p {
  margin-block-start: 0.75rem;
  margin-block-end: 0.75rem;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app.html src/app.css
git commit -m "feat: add global styles and app shell"
```

---

### Task 4: Emoji store with tests

**Files:**
- Create: `src/lib/emojiStore.ts`, `src/lib/emojiStore.test.ts`

- [ ] **Step 1: Write the failing tests**

`src/lib/emojiStore.test.ts`:

```ts
import { describe, it, expect, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { emojiIndex, emojiList } from './emojiStore';

afterEach(() => {
  emojiIndex.set(0);
});

describe('emojiStore', () => {
  it('starts at index 0', () => {
    expect(get(emojiIndex)).toBe(0);
  });

  it('emojiList has at least one item', () => {
    expect(emojiList.length).toBeGreaterThan(0);
  });

  it('all emojiList items are strings', () => {
    emojiList.forEach((e) => expect(typeof e).toBe('string'));
  });

  it('emojiIndex can be updated', () => {
    emojiIndex.set(3);
    expect(get(emojiIndex)).toBe(3);
  });
});
```

- [ ] **Step 2: Run to confirm they fail**

```bash
pnpm test
```

Expected: FAIL — cannot find module `./emojiStore`.

- [ ] **Step 3: Write emojiStore.ts**

`src/lib/emojiStore.ts`:

```ts
import { writable } from 'svelte/store';

export const emojiList = [
  '👋', '✌️', '🤟', '🤗', '🙂', '😎', '👨‍💻', '👨‍🌾', '👨‍🎨',
  '⚛️', '🥁', '💛', '🌹', '✊🏾', '🌈', '💯', '🚀', '⚡️',
  '🍳', '🍨', '🐶', '🐝', '🐞', '🐛', '🌻', '🌱', '🏔', '🏗', '📡',
];

export const emojiIndex = writable(0);
```

- [ ] **Step 4: Run to confirm they pass**

```bash
pnpm test
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/emojiStore.ts src/lib/emojiStore.test.ts
git commit -m "feat: add emoji store"
```

---

### Task 5: Emoji component with tests

**Files:**
- Create: `src/lib/components/Emoji.svelte`, `src/lib/components/Emoji.test.ts`

The component reads from `emojiIndex` store and displays the current emoji. When `animate` is true it advances the store on an interval.

- [ ] **Step 1: Write the failing tests**

`src/lib/components/Emoji.test.ts`:

```ts
import { describe, it, expect, afterEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { emojiIndex, emojiList } from '$lib/emojiStore';
import Emoji from './Emoji.svelte';

afterEach(() => {
  emojiIndex.set(0);
});

describe('Emoji', () => {
  it('renders the emoji at the current store index', () => {
    emojiIndex.set(0);
    const { container } = render(Emoji, { props: { animate: false } });
    expect(container.textContent).toContain(emojiList[0]);
  });

  it('renders a different emoji when the store index is 2', () => {
    emojiIndex.set(2);
    const { container } = render(Emoji, { props: { animate: false } });
    expect(container.textContent).toContain(emojiList[2]);
  });
});
```

- [ ] **Step 2: Run to confirm they fail**

```bash
pnpm test
```

Expected: FAIL — `Emoji.svelte` not found.

- [ ] **Step 3: Write Emoji.svelte**

`src/lib/components/Emoji.svelte`:

```svelte
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
```

- [ ] **Step 4: Run to confirm all tests pass**

```bash
pnpm test
```

Expected: 6 tests pass (4 store + 2 emoji).

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/Emoji.svelte src/lib/components/Emoji.test.ts
git commit -m "feat: add Emoji component"
```

---

### Task 6: EmojiBG component

No logic tests — purely CSS. Visually verified in Task 11.

**Files:**
- Create: `src/lib/components/EmojiBG.svelte`

The component renders a fixed, full-bleed tiled background. The tile is an SVG data URL containing the current emoji. Hidden on mobile via CSS.

- [ ] **Step 1: Write EmojiBG.svelte**

`src/lib/components/EmojiBG.svelte`:

```svelte
<script lang="ts">
  import { emojiIndex, emojiList } from '$lib/emojiStore';

  const size = 75;
  const displaySize = size * 0.73;

  const bgImage = $derived(
    `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size * 0.78} ${size * 0.83}'><foreignObject width='${size}px' height='${size}px'><div xmlns='http://www.w3.org/1999/xhtml' style='font-size:${displaySize}px;text-shadow:1px 1px white'>${emojiList[$emojiIndex]}</div></foreignObject></svg>")`
  );
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/EmojiBG.svelte
git commit -m "feat: add EmojiBG component"
```

---

### Task 7: Socials component

**Files:**
- Create: `src/lib/components/Socials.svelte`

Renders four links (GitHub, LinkedIn, Resume, Email) with FontAwesome SVG icons and CSS-only tooltips. The `icon()` function from `@fortawesome/fontawesome-svg-core` converts icon definitions to SVG HTML strings — no React wrapper needed.

- [ ] **Step 1: Write Socials.svelte**

`src/lib/components/Socials.svelte`:

```svelte
<script lang="ts">
  import { icon as faIcon } from '@fortawesome/fontawesome-svg-core';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { faFileAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

  const socials = [
    {
      type: 'github',
      label: "Visit Dan Cormier's GitHub",
      tooltip: 'github',
      url: 'https://github.com/dancormier',
      iconHtml: faIcon(faGithub).html[0],
    },
    {
      type: 'linkedin',
      label: "Visit Dan Cormier's LinkedIn",
      tooltip: 'linkedin',
      url: 'https://www.linkedin.com/in/dancormier',
      iconHtml: faIcon(faLinkedin).html[0],
    },
    {
      type: 'resume',
      label: "View Dan Cormier's resume",
      tooltip: 'resume',
      url: 'https://docs.google.com/document/d/1XcjhIYcCvxCqTJQaYUWsokPwOX4lrHoD9FEq519urXM/edit?usp=sharing',
      iconHtml: faIcon(faFileAlt).html[0],
    },
    {
      type: 'email',
      label: 'Email Dan Cormier',
      tooltip: 'email',
      url: 'mailto:dancormierall@gmail.com',
      iconHtml: faIcon(faPaperPlane).html[0],
    },
  ] as const;
</script>

<div class="socials">
  {#each socials as social}
    <a
      aria-label={social.label}
      href={social.url}
      class="social-link"
      data-tooltip={social.tooltip}
      target={social.type !== 'email' ? '_blank' : undefined}
      rel={social.type !== 'email' ? 'noopener noreferrer' : undefined}
    >
      {@html social.iconHtml}
    </a>
  {/each}
</div>

<style>
  .socials {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.6rem;
    gap: 0 1.25rem;
    margin-top: 1rem;
  }

  .social-link {
    color: var(--color-text);
    position: relative;
    transition: color 0.1s;
  }

  .social-link:hover,
  .social-link:focus {
    color: var(--color-highlight);
  }

  .social-link[data-tooltip]::after {
    background: var(--color-primary);
    border-radius: 4px;
    bottom: calc(100% + 6px);
    color: #fff;
    content: attr(data-tooltip);
    font-family: var(--font-body);
    font-size: 0.75rem;
    left: 50%;
    opacity: 0;
    padding: 2px 8px;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    transition: opacity 0.1s;
    white-space: nowrap;
  }

  @media (hover: hover) {
    .social-link[data-tooltip]:hover::after {
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/Socials.svelte
git commit -m "feat: add Socials component"
```

---

### Task 8: Header component

**Files:**
- Create: `src/lib/components/Header.svelte`

Two-column layout on desktop (text + socials left, avatar right), single column centered on mobile (avatar top). The emoji next to the name is triggered by hovering the name row on desktop; hidden on mobile (standalone emoji is rendered separately and shown below the socials in the layout).

- [ ] **Step 1: Write Header.svelte**

`src/lib/components/Header.svelte`:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Emoji from './Emoji.svelte';

  let { children }: { children?: Snippet } = $props();
  let animateEmoji = $state(false);
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
    <Emoji animate={true} speed={800} />
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
    font-size: clamp(2rem, 6vw, 3rem);
    justify-content: center;
    margin: 0 0 0.25rem;
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
    font-size: clamp(1.2rem, 3.5vw, 1.6rem);
    margin: 0 0 0.5rem;
    text-transform: uppercase;
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/Header.svelte
git commit -m "feat: add Header component"
```

---

### Task 9: Footer component

**Files:**
- Create: `src/lib/components/Footer.svelte`

- [ ] **Step 1: Write Footer.svelte**

`src/lib/components/Footer.svelte`:

```svelte
<footer>
  <p>© {new Date().getFullYear()} Dan Cormier</p>
</footer>

<style>
  footer {
    font-size: 0.8rem;
    padding: 1rem 1.5rem;
    text-align: center;
  }

  @media (min-width: 832px) {
    footer {
      margin: 0 auto;
      max-width: 900px;
      text-align: left;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/Footer.svelte
git commit -m "feat: add Footer component"
```

---

### Task 10: Routes — layout, home page, 404

**Files:**
- Create: `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/routes/+error.svelte`

- [ ] **Step 1: Write +layout.svelte**

`src/routes/+layout.svelte`:

```svelte
<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import EmojiBG from '$lib/components/EmojiBG.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>Dan Cormier</title>
  <meta name="description" content="Frontend engineer based in North Carolina." />
</svelte:head>

<div class="page">
  <EmojiBG />
  <main>{@render children()}</main>
  <Footer />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  main {
    flex: 1;
  }
</style>
```

- [ ] **Step 2: Write +page.svelte**

`src/routes/+page.svelte`:

```svelte
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Socials from '$lib/components/Socials.svelte';
</script>

<Header>
  <p>I live in North Carolina and work for <a href="https://stackoverflow.com">Stack Overflow</a>.</p>
  <Socials />
</Header>
```

- [ ] **Step 3: Write +error.svelte**

`src/routes/+error.svelte`:

```svelte
<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} — Dan Cormier</title>
</svelte:head>

<div class="error">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message ?? 'Page not found'}</p>
  <a href="/">← Home</a>
</div>

<style>
  .error {
    max-width: 900px;
    margin: 0 auto;
    padding: 10vh 1.5rem 0;
    text-align: center;
  }

  h1 {
    color: var(--color-primary);
    font-family: var(--font-heading);
    font-size: 4rem;
    margin: 0;
  }

  p {
    color: var(--color-secondary);
    font-size: 1.2rem;
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/routes/+layout.svelte src/routes/+page.svelte src/routes/+error.svelte
git commit -m "feat: add routes — layout, home, 404"
```

---

### Task 11: Netlify config + build verification

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Write netlify.toml**

```toml
[build]
  command = "pnpm build"
  publish = "build"
```

- [ ] **Step 2: Run all tests**

```bash
pnpm test
```

Expected: 6 tests pass.

- [ ] **Step 3: Run type checker**

```bash
pnpm check
```

Expected: no errors. Fix any before proceeding.

- [ ] **Step 4: Run dev server — visual check**

```bash
pnpm dev
```

Open `http://localhost:5173` and verify:

- Dark navy background visible
- Tiled emoji background slowly scrolling (desktop only)
- Name "Dan Cormier" in pink Fredoka One, all caps
- Subtitle "Frontend engineer" in green Fredoka One, all caps
- Bio paragraph renders with Stack Overflow link
- Four social icons (GitHub, LinkedIn, Resume, Email) appear
- Tooltips appear on hover (desktop)
- Avatar appears: right side on desktop (mirrored, greyscale), top on mobile (pink glow)
- Avatar hover on desktop: full color, slight scale-up, pink glow
- Emoji wobbles next to name on hover (desktop)
- Standalone animated emoji below socials (mobile)
- Footer shows `© 2026 Dan Cormier`
- 404: navigate to `/anything` — shows 404 page with home link

- [ ] **Step 5: Run production build**

```bash
pnpm build
```

Expected: `build/` directory created, no errors.

- [ ] **Step 6: Commit**

```bash
git add netlify.toml
git commit -m "chore: add netlify config and verify build"
```
