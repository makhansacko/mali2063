import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Locale } from './types.ts';
import { DEFAULT_LOCALE } from './types.ts';

const STORAGE_KEY = 'mali2063-locale';

export function parseLocaleParam(value: string | null): Locale | null {
	if (value === 'fr' || value === 'en') return value;
	return null;
}

function readInitialLocale(): Locale {
	if (!browser) return DEFAULT_LOCALE;

	const fromUrl = parseLocaleParam(new URLSearchParams(window.location.search).get('lang'));
	if (fromUrl) return fromUrl;

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'fr' || stored === 'en') return stored;

	return DEFAULT_LOCALE;
}

export const locale = writable<Locale>(readInitialLocale());

export function setLocale(next: Locale) {
	locale.set(next);
}

export function applyLocaleFromSearchParams(searchParams: URLSearchParams) {
	const fromUrl = parseLocaleParam(searchParams.get('lang'));
	if (fromUrl) setLocale(fromUrl);
}

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
		document.documentElement.lang = value;
	});
}
