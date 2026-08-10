import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Locale } from './types.ts';
import { DEFAULT_LOCALE } from './types.ts';

const STORAGE_KEY = 'mali2063-locale';

function readStoredLocale(): Locale {
	if (!browser) return DEFAULT_LOCALE;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'fr' || stored === 'en') return stored;
	return DEFAULT_LOCALE;
}

export const locale = writable<Locale>(readStoredLocale());

export function setLocale(next: Locale) {
	locale.set(next);
}

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
		document.documentElement.lang = value;
	});
}
