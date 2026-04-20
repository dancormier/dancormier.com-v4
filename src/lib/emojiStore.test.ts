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
