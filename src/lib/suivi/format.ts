import type { Locale } from '$lib/i18n/types';

export function formatSuiviNumber(
	value: number | null | undefined,
	locale: Locale,
	digits = 1
): string {
	if (value == null) return locale === 'fr' ? 'Non renseigné' : 'Not reported';
	return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
		maximumFractionDigits: digits
	}).format(value);
}

export function formatIsoDate(iso: string, locale: Locale): string {
	const [year, month, day] = iso.split('-');
	return locale === 'fr' ? `${day}/${month}/${year}` : `${day}/${month}/${year}`;
}

export function csvEscape(value: string | number | null | undefined): string {
	let text = String(value ?? '');
	if (/^[=+@-]/.test(text)) text = `'${text}`;
	return `"${text.replaceAll('"', '""')}"`;
}
