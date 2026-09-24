import { indicators, type Indicator, type Project } from './vision';
import {
	HORIZON_YEAR,
	expectedAt,
	indicatorStatus,
	progressScore,
	projectStatus,
	type LightStatus
} from '$lib/suivi/calc';
import type { Locale } from '$lib/i18n/types';

export type Bilingual = { fr: string; en: string };

export type ActionState = 'open' | 'progress' | 'done';

export type SuiviAction = {
	id: number;
	projectId: string;
	title: Bilingual;
	owner: Bilingual;
	due: string;
	level: Bilingual;
	state: ActionState;
	effect: Bilingual;
	note?: string;
};

export type TrackedProject = Project & {
	actual: number;
	plan: number;
	spent: number;
	budget: number;
	owner: Bilingual;
	blocker: Bilingual;
	region: Bilingual;
	status: Exclude<LightStatus, 'gray'>;
};

export type TrackedIndicator = Indicator & {
	projectId: string;
	actual: number | null;
	updatedAt: string | null;
	expected: number;
	score: number | null;
	status: LightStatus;
};

const PROJECT_OVERLAY: Array<{
	projectId: string;
	actual: number;
	plan: number;
	spent: number;
	owner: Bilingual;
	blocker: Bilingual;
	region: Bilingual;
}> = [
	{
		projectId: 'projet-1',
		actual: 38,
		plan: 60,
		spent: 52,
		owner: { fr: 'Équipe Agriculture', en: 'Agriculture team' },
		blocker: {
			fr: 'Sécurisation foncière de deux sites',
			en: 'Land tenure security for two sites'
		},
		region: { fr: 'Sikasso, Ségou', en: 'Sikasso, Ségou' }
	},
	{
		projectId: 'projet-2',
		actual: 42,
		plan: 65,
		spent: 61,
		owner: { fr: 'Équipe Énergie', en: 'Energy team' },
		blocker: {
			fr: 'Validation du raccordement au réseau',
			en: 'Grid connection still to be validated'
		},
		region: { fr: 'Bamako, Kayes', en: 'Bamako, Kayes' }
	},
	{
		projectId: 'projet-3',
		actual: 55,
		plan: 60,
		spent: 48,
		owner: { fr: 'Équipe Industrie', en: 'Industry team' },
		blocker: {
			fr: 'Commande des équipements à finaliser',
			en: 'Equipment order still to be completed'
		},
		region: { fr: 'Bamako, Sikasso', en: 'Bamako, Sikasso' }
	},
	{
		projectId: 'projet-4',
		actual: 60,
		plan: 58,
		spent: 54,
		owner: { fr: 'Équipe Culture et Tourisme', en: 'Culture and tourism team' },
		blocker: { fr: 'Aucun blocage critique', en: 'No critical blocker' },
		region: { fr: 'Périmètre national', en: 'Nationwide' }
	},
	{
		projectId: 'projet-5',
		actual: 28,
		plan: 50,
		spent: 38,
		owner: { fr: 'Équipe Transports', en: 'Transport team' },
		blocker: {
			fr: 'Validation des études de liaison',
			en: 'Link studies still to be validated'
		},
		region: { fr: 'Sikasso, Ségou', en: 'Sikasso, Ségou' }
	},
	{
		projectId: 'projet-6',
		actual: 67,
		plan: 65,
		spent: 62,
		owner: { fr: 'Équipe Développement urbain', en: 'Urban development team' },
		blocker: { fr: 'Aucun blocage critique', en: 'No critical blocker' },
		region: { fr: 'Bamako, Kayes', en: 'Bamako, Kayes' }
	},
	{
		projectId: 'projet-7',
		actual: 51,
		plan: 60,
		spent: 55,
		owner: { fr: 'Équipe Innovation et Numérique', en: 'Innovation and digital team' },
		blocker: {
			fr: 'Mobilisation des équipes techniques',
			en: 'Technical teams still being mobilised'
		},
		region: { fr: 'Bamako, Sikasso', en: 'Bamako, Sikasso' }
	},
	{
		projectId: 'projet-8',
		actual: 44,
		plan: 62,
		spent: 49,
		owner: { fr: 'Équipe Santé', en: 'Health team' },
		blocker: {
			fr: 'Retard dans la passation du marché',
			en: 'Delay in the procurement process'
		},
		region: { fr: 'Périmètre national', en: 'Nationwide' }
	},
	{
		projectId: 'projet-9',
		actual: 33,
		plan: 50,
		spent: 30,
		owner: { fr: 'Équipe Environnement', en: 'Environment team' },
		blocker: {
			fr: 'Données de terrain à consolider',
			en: 'Field data still to be consolidated'
		},
		region: { fr: 'Sikasso, Ségou', en: 'Sikasso, Ségou' }
	},
	{
		projectId: 'projet-10',
		actual: 70,
		plan: 68,
		spent: 57,
		owner: { fr: 'Équipe Gouvernance', en: 'Governance team' },
		blocker: { fr: 'Aucun blocage critique', en: 'No critical blocker' },
		region: { fr: 'Bamako, Kayes', en: 'Bamako, Kayes' }
	},
	{
		projectId: 'projet-11',
		actual: 35,
		plan: 48,
		spent: 39,
		owner: { fr: 'Équipe Information', en: 'Information team' },
		blocker: {
			fr: 'Convention de partenariat en attente',
			en: 'Partnership agreement still pending'
		},
		region: { fr: 'Bamako, Sikasso', en: 'Bamako, Sikasso' }
	}
];

const INDICATOR_OVERLAY: Array<{
	indicatorId: string;
	projectId: string;
	actual: number | null;
	updatedAt: string | null;
}> = [
	{ indicatorId: 'ind-electricity', projectId: 'projet-2', actual: 59.5, updatedAt: '2026-09-15' },
	{ indicatorId: 'ind-water-access', projectId: 'projet-9', actual: 80.2, updatedAt: '2026-09-10' },
	{ indicatorId: 'ind-poverty', projectId: 'projet-1', actual: 42.1, updatedAt: '2026-08-30' },
	{ indicatorId: 'ind-employment', projectId: 'projet-3', actual: 40.1, updatedAt: '2026-09-12' },
	{ indicatorId: 'ind-infant-mortality', projectId: 'projet-8', actual: 48.8, updatedAt: '2026-09-08' },
	{ indicatorId: 'ind-idh', projectId: 'projet-8', actual: null, updatedAt: null }
];

export const initialActions: SuiviAction[] = [
	{
		id: 1,
		projectId: 'projet-2',
		title: {
			fr: 'Valider le schéma de raccordement',
			en: 'Validate the grid-connection plan'
		},
		owner: { fr: 'Responsable Énergie', en: 'Energy lead' },
		due: '2026-09-25',
		level: { fr: 'Arbitrage interministériel', en: 'Interministerial decision' },
		state: 'open',
		effect: {
			fr: 'Débloquer la validation du lot de raccordement avant la prochaine revue.',
			en: 'Unlock validation of the connection package before the next review.'
		}
	},
	{
		id: 2,
		projectId: 'projet-1',
		title: {
			fr: 'Arrêter une solution foncière pour deux sites',
			en: 'Agree a land solution for two sites'
		},
		owner: { fr: 'Responsable Agriculture', en: 'Agriculture lead' },
		due: '2026-09-28',
		level: { fr: 'Arbitrage interministériel', en: 'Interministerial decision' },
		state: 'open',
		effect: {
			fr: 'Permettre le lancement des études de site et sécuriser le calendrier.',
			en: 'Allow site studies to start and protect the timetable.'
		}
	},
	{
		id: 3,
		projectId: 'projet-8',
		title: {
			fr: 'Finaliser le dossier de passation du marché',
			en: 'Complete the procurement file'
		},
		owner: { fr: 'Responsable Santé', en: 'Health lead' },
		due: '2026-09-18',
		level: { fr: 'Résolution sectorielle', en: 'Sector resolution' },
		state: 'progress',
		effect: {
			fr: 'Soumettre le dossier complet au comité de validation.',
			en: 'Submit the complete file to the validation committee.'
		}
	},
	{
		id: 4,
		projectId: 'projet-9',
		title: {
			fr: 'Consolider les données de terrain',
			en: 'Consolidate the field data'
		},
		owner: { fr: 'Responsable Environnement', en: 'Environment lead' },
		due: '2026-09-24',
		level: { fr: 'Résolution sectorielle', en: 'Sector resolution' },
		state: 'progress',
		effect: {
			fr: 'Disposer d’une base vérifiée pour la revue suivante.',
			en: 'Have a verified baseline ready for the next review.'
		}
	}
];

export function getTrackedProjects(localizedProjects: Project[]): TrackedProject[] {
	return localizedProjects.map((project, index) => {
		const overlay = PROJECT_OVERLAY.find((item) => item.projectId === project.id);
		const actual = overlay?.actual ?? 0;
		const plan = overlay?.plan ?? 0;
		return {
			...project,
			actual,
			plan,
			spent: overlay?.spent ?? 0,
			budget: 80 + index * 23,
			owner: overlay?.owner ?? { fr: '', en: '' },
			blocker: overlay?.blocker ?? { fr: '', en: '' },
			region: overlay?.region ?? { fr: '', en: '' },
			status: projectStatus(plan, actual)
		};
	});
}

export function getTrackedIndicators(localizedIndicators: Indicator[]): TrackedIndicator[] {
	return INDICATOR_OVERLAY.flatMap((overlay) => {
		const source =
			localizedIndicators.find((item) => item.id === overlay.indicatorId) ??
			indicators.find((item) => item.id === overlay.indicatorId);
		if (!source) return [];
		const expected = expectedAt(
			source.baseline,
			source.baselineYear,
			source.targets[2033],
			HORIZON_YEAR
		);
		const score = progressScore(source.baseline, expected, overlay.actual);
		return [
			{
				...source,
				projectId: overlay.projectId,
				actual: overlay.actual,
				updatedAt: overlay.updatedAt,
				expected,
				score,
				status: indicatorStatus(score)
			}
		];
	});
}

export function pickLang(value: Bilingual, locale: Locale): string {
	return locale === 'en' ? value.en : value.fr;
}
