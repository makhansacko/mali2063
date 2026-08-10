import type { Locale } from '$lib/i18n/types';
import {
	axes,
	projects,
	indicators,
	phases,
	type Axe,
	type Project,
	type Indicator
} from './vision';
import { visionEn } from './vision.en';

function translateLabel(id: string, fallback: string, map: Record<string, string>): string {
	return map[id] ?? fallback;
}

export function getAxes(loc: Locale): Axe[] {
	if (loc === 'fr') return axes;

	return axes.map((axe) => ({
		...axe,
		label: translateLabel(axe.id, axe.label, visionEn.axes),
		globalObjectives: axe.globalObjectives.map((go) => ({
			...go,
			label: translateLabel(go.id, go.label, visionEn.objectives),
			specificObjectives: go.specificObjectives.map((so) => ({
				...so,
				label: translateLabel(so.id, so.label, visionEn.objectives)
			}))
		}))
	}));
}

export function getProjects(loc: Locale): Project[] {
	if (loc === 'fr') return projects;

	return projects.map((project) => {
		const enProject = visionEn.projects[project.id as keyof typeof visionEn.projects];
		return {
			...project,
			nameFr: enProject?.nameFr ?? project.nameFr,
			description: enProject?.description ?? project.description,
			descriptionHighlight: enProject?.descriptionHighlight ?? project.descriptionHighlight,
			indicators: project.indicators.map((ind) => ({
				...ind,
				label: translateLabel(ind.id, ind.label, visionEn.projectIndicators),
				unit:
					visionEn.indicatorUnits[ind.id as keyof typeof visionEn.indicatorUnits] ?? ind.unit
			}))
		};
	});
}

export function getIndicators(loc: Locale): Indicator[] {
	if (loc === 'fr') return indicators;

	return indicators.map((ind) => ({
		...ind,
		label: translateLabel(ind.id, ind.label, visionEn.indicators),
		unit: visionEn.standaloneUnits[ind.id as keyof typeof visionEn.standaloneUnits] ?? ind.unit
	}));
}

export function getPhases(loc: Locale) {
	if (loc === 'fr') return phases;

	return phases.map((phase) => {
		const enPhase = visionEn.phases[phase.id as keyof typeof visionEn.phases];
		return {
			...phase,
			label: enPhase?.label ?? phase.label,
			description: enPhase?.description ?? phase.description
		};
	});
}
