export function isPositiveInteger(n: any) {
  return n >>> 0 === parseFloat(n);
}

export function buildTitle(text: string) {
  return text + ' | NetHub';
}

export function capitalizeFirstLetter(str?: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getDomain = (link: string | null) => {
  if (link === null) return undefined;

  const url = new URL(link);
  const domain = url.hostname.replace('www.', '');
  return domain;
};

/* eslint-disable prettier/prettier */
/* eslint-disable */
const sanEmojis = [
  '😞',
  '😔',
  '🙁',
  '😕',
  '😟',
  '😣',
  '😒',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😳',
  '🥶',
  '🥵',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '🤥',
  '😶',
  '😬',
  '🙄',
  '😦',
  '😧',
  '😮',
  '😲',
  '🤐',
  '🤕',
  '💀',
  '☠️',
  '🙀',
  '😿',
  '💅',
  '👮',
  '🤷',
  '🐷',
  '🐮',
  '🙈',
  '🙊',
  '🐒',
  '🦧',
  '🦍',
  '🐖',
  '🌝',
  '🌧',
  '🌨',
  '🗿',
  '☢️',
  '☣️',
  '🆘',
  '🚷',
  '📵',
  '🔞',
  '🚭',
  '🧐',
  '🤪',
];

export function randomSadEmoji(): string {
  return sanEmojis[getRandomInt(0, sanEmojis.length)];
}
