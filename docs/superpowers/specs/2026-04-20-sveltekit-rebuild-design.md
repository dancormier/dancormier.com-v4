# SvelteKit Rebuild — Design Spec

**Date:** 2026-04-20

## Overview

Rebuild dancormier.com-v4 from a deeply outdated Gatsby 3 stack to SvelteKit. The visual design, content structure, and emoji features are preserved as-is. No redesign, no CMS, no analytics.

## Stack

| Concern | Choice |
|---|---|
| Framework | SvelteKit |
| Language | TypeScript |
| Styling | Plain Svelte scoped CSS + CSS variables |
| Deployment | Netlify (`adapter-netlify`) |
| Icons | FontAwesome (core + free-brands + free-solid, no React wrapper) |
| Tooltips | CSS (`[data-tooltip]` + `::after` pseudo-element) |

Removed: Gatsby, React, Theme UI, Netlify CMS, Google Analytics, tippy.js, react-responsive, emotion.

## Project Structure

```
src/
  app.css                  # CSS variables (colors, fonts), global resets
  app.html                 # SvelteKit shell — Google Fonts <link> here
  lib/
    emojiStore.ts          # Svelte writable store — shared emoji index
    components/
      Header.svelte        # Name, subtitle, avatar, animated emoji
      Footer.svelte
      Socials.svelte       # FA icons with CSS tooltips
      Emoji.svelte         # Rotating emoji, reads/writes emojiStore
      EmojiBG.svelte       # Tiled scrolling emoji background (desktop only)
  routes/
    +layout.svelte         # Root layout — mounts EmojiBG, imports app.css
    +page.svelte           # Home page — hardcoded bio, renders Header + Socials
    +error.svelte          # 404
static/
  avatar.jpg
svelte.config.js           # adapter-netlify
```

## Visual Design

Exact replication of the existing design:

| Token | Value |
|---|---|
| Background | `#20253c` |
| Text | `#faeae0` |
| Primary (headings) | `#f36c9c` |
| Secondary / links | `#10c785` |
| Highlight (hover) | `#f36c9c` |
| Body font | Inter (Google Fonts) |
| Heading font | Fredoka One (Google Fonts) |

**Layout:**
- Desktop (≥832px): two-column flex row — text/socials left, avatar right; content offset ~25vh from top
- Mobile (<832px): single column centered — avatar top, text below, standalone emoji below socials; content offset ~10vh from top

**Emoji background:** fixed, tiled, slowly scrolling (80s animation), desktop only, 3% opacity, greyscale 50%. Updates in sync with the active emoji index via `emojiStore`.

**Emoji in header:** rotates through `emojiList` on hover (desktop) or continuously at 800ms interval (mobile standalone). Wobble animation (CSS keyframes, 3s infinite).

## Emoji State

A Svelte `writable` store (`emojiStore.ts`) holds the current emoji index. Both `Emoji.svelte` and `EmojiBG.svelte` subscribe to it. `Emoji.svelte` advances the index via `setInterval` when `animate` prop is true.

```ts
// src/lib/emojiStore.ts
import { writable } from 'svelte/store';
export const emojiIndex = writable(0);
export const emojiList = [ /* same list as current */ ];
```

## Hardcoded Content

```
Name:     Dan Cormier
Subtitle: Frontend engineer
Bio:      I live in North Carolina and work for [Stack Overflow](https://stackoverflow.com).
Avatar:   /avatar.jpg
```

**Social links:**

| Type | URL |
|---|---|
| GitHub | https://github.com/dancormier |
| LinkedIn | https://linkedin.com/in/dancormier |
| Resume | https://docs.google.com/document/d/1XcjhIYcCvxCqTJQaYUWsokPwOX4lrHoD9FEq519urXM/edit?usp=sharing |
| Email | mailto:dancormierall@gmail.com |

## Avatar

`/avatar.jpg` rendered as a circle with these CSS effects:
- **Desktop default:** `transform: scale(-1, 1)` (mirrored), `filter: grayscale(1) brightness(60%) sepia(1) hue-rotate(-135deg)`, `box-shadow: 0 0 2rem black`
- **Desktop hover:** full color, `transform: scale(-1.1, 1.1)`, `box-shadow: 0 0 2rem 0 #f36c9c`, 0.2s transition
- **Mobile:** pink glow shadow (`0 0 2rem 0 #f36c9c`), no grayscale filter, same mirror transform

## Footer

`© {currentYear} Dan Cormier` — small text, centered on mobile, left-aligned on desktop. Pinned to bottom of page.

## Tooltips

Replace `@tippyjs/react` with a CSS-only approach. Each social link gets a `data-tooltip` attribute. The tooltip is rendered via `::after` pseudo-element in `Socials.svelte`'s scoped styles. Touch devices: no tooltip shown (`:hover` only).

## SEO / Head

`+layout.svelte` sets default title and meta description via `<svelte:head>`. `+page.svelte` overrides the title to `Dan Cormier`.

## 404 Page

`+error.svelte` renders inside the root layout with a simple "Page not found" message, consistent with the existing 404 page style.

## What's Dropped

- Gatsby and all gatsby-* plugins
- React + React DOM
- Theme UI + @theme-ui/presets + emotion
- Netlify CMS + netlify-cms-app
- Google Analytics (UA-15028625-1 — already sunset)
- tippy.js + @tippyjs/react
- react-responsive (replaced by CSS media queries)
- gatsby-plugin-web-font-loader (replaced by `<link>` in app.html)
- All Gatsby GraphQL data layer (content hardcoded)
- gatsby-plugin-alias-imports (SvelteKit uses `$lib` alias natively)
