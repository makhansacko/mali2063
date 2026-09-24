import { formatNumber } from '$lib/i18n';

export function formatIndicatorValue(val: number, unit: string): string {
	const formatted =
		Math.abs(val) >= 1000 ? formatNumber(val) : val % 1 === 0 ? String(val) : val.toFixed(1);
	return unit === '%' ? `${formatted}%` : `${formatted} ${unit}`.trim();
}

export function formatCompactValue(val: number, unit: string): string {
	return `${val}${unit === '%' ? '%' : ''}`;
}
