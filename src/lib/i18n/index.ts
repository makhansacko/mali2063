import { derived, get } from 'svelte/store';
import { locale } from './locale.ts';
import { messages, type MessageKey } from './messages.ts';
import type { Locale } from './types.ts';

export { locale, setLocale, parseLocaleParam, applyLocaleFromSearchParams } from './locale.ts';
export type { Locale } from './types.ts';

export const t = derived(locale, ($locale) => {
	return (key: MessageKey): string => messages[$locale][key] ?? messages.fr[key];
});

export function translate(key: MessageKey, loc?: Locale): string {
	const active = loc ?? get(locale);
	return messages[active][key] ?? messages.fr[key];
}

export function formatNumber(value: number, loc?: Locale): string {
	const active = loc ?? get(locale);
	return value.toLocaleString(active === 'fr' ? 'fr-FR' : 'en-US', {
		maximumFractionDigits: value % 1 === 0 ? 0 : 1
	});
}
