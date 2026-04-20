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
