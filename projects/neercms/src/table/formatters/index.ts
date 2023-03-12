import { DateTime } from 'luxon';
import { getDomain } from '../../shared/utilities';

export const maxStringLength = 28;
export const emptyStringPlaceholder = '<span class="text-dimmed">—</span>';

export function formatAsDate(value: string | undefined): string {
  return value ? DateTime.fromISO(value).toFormat('dd/MM/yyyy HH:mm') : emptyStringPlaceholder;
}

export function formatCheckmark(value: string | undefined): string {
  if (value) {
    return '<span class="check check-true">yes</span>';
  } else {
    return '<span class="check check-false">no</span>';
  }
}

export function formatCounter(value: number) {
  if (value > 0) {
    return `<span class="counter counter-positive"><i class="las la-heart"></i> ${value}</span>`;
  } else if (value < 0) {
    return `<span class="counter counter-negative"><i class="las la-heart"></i>️ ${-value}</span>`;
  } else {
    return `<span class="counter"><i class="las la-heart"></i>️ ${value}</span>`;
  }
}

export function formatLink(link: string | null) {
  if (link) {
    const display = getDomain(link);
    return `<a href=\"${link}\" title=\"${link}\">${display}</a>`;
  } else {
    return emptyStringPlaceholder;
  }
}

export function formatAsText(value: string | undefined): string {
  return limitStringLength(value, maxStringLength, emptyStringPlaceholder);
}

export function limitStringLength(
  sourceString: string | undefined,
  maxLength: number,
  defaultValue: string,
) {
  if (!sourceString) {
    return defaultValue;
  }
  if (sourceString.length > maxLength) {
    return sourceString.substring(0, maxLength - 3) + '...';
  }
  return sourceString;
}
