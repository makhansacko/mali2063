export type LightStatus = 'green' | 'amber' | 'red' | 'gray';

export const HORIZON_YEAR = 2026;
export const REVIEW_AS_OF = '2026-09-21';
export const NEXT_REVIEW = '2026-09-28';

export function expectedAt(
	baseline: number,
	baselineYear: number,
	target2033: number,
	year: number
): number {
	if (year <= baselineYear) return baseline;
	const span = 2033 - baselineYear;
	if (span === 0) return target2033;
	return baseline + ((target2033 - baseline) * (year - baselineYear)) / span;
}

export function progressScore(
	baseline: number,
	expected: number,
	actual: number | null
): number | null {
	if (actual == null || expected === baseline) return null;
	return ((actual - baseline) / (expected - baseline)) * 100;
}

export function indicatorStatus(score: number | null): LightStatus {
	if (score == null) return 'gray';
	if (score >= 95) return 'green';
	if (score >= 75) return 'amber';
	return 'red';
}

export function projectStatus(plan: number, actual: number): Exclude<LightStatus, 'gray'> {
	const gap = plan - actual;
	if (gap > 15) return 'red';
	if (gap > 5) return 'amber';
	return 'green';
}

export function isOverdue(due: string, asOf = REVIEW_AS_OF): boolean {
	return due < asOf;
}
