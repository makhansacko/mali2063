import type { Locale } from './types.ts';

const fr = {
	'lang.switch': 'EN',
	'lang.switchAria': 'Passer en anglais',
	'lang.current': 'FR',

	'nav.vision': 'Vision',
	'nav.indicators': 'Indicateurs',

	'hero.subtitle':
		'Une lecture indépendante de la Vision Mali 2063 - pour les citoyens, la diaspora, la société civile et le secteur privé.',
	'hero.scroll': 'Défiler vers le bas',

	'intro.referenceLabel': 'Le cadre de référence',
	'intro.visionTitle': 'Vision Mali 2063',
	'intro.visionCoverAlt':
		'Vision Mali Kura 2063 — couverture officielle (PDF sur finances.ml)',
	'intro.visionParagraph':
		'En décembre 2024, le gouvernement du Mali a publié la Vision Mali Kura 2063 (MALI KURA NƐTAASIRA KA BƐN SAN 2063 MA) — un cadre de développement national sur quarante ans, organisé autour de 4 phases décennales et 11 projets structurants couvrant l\'ensemble du territoire malien.',
	'intro.phasesLabel': 'Les 4 phases décennales',
	'intro.phase1.name': 'Refondation (SNEDD)',
	'intro.phase1.desc':
		'Stabilisation, réformes institutionnelles et premières transformations structurelles.',
	'intro.phase2.name': 'Spécialisation',
	'intro.phase2.desc': 'Montée en compétitivité et spécialisation économique par secteur.',
	'intro.phase3.name': 'Développement Humain',
	'intro.phase3.desc': 'Haut niveau de développement humain, bien-être social et rayonnement.',
	'intro.phase4.name': 'Consolidation',
	'intro.phase4.desc':
		'Consolidation des acquis et positionnement du Mali comme modèle africain.',
	'intro.phaseAria': 'Phase {n}',
	'intro.sneddLabel': 'La stratégie opérationnelle',
	'intro.sneddTitle': 'SNEDD 2024–2033',
	'intro.sneddP1':
		'La Stratégie Nationale de Développement Durable 2024-2033 (SNEDD) est le cadre opérationnel de la première décennie de la Vision Mali 2063. Elle traduit les ambitions de long terme en objectifs mesurables et en actions concrètes pour les dix prochaines années.',
	'intro.sneddP2':
		'La SNEDD est organisée autour de 5 axes stratégiques, 13 objectifs globaux et 38 objectifs spécifiques — chacun assorti d\'indicateurs de suivi avec des valeurs de référence et des cibles à l\'horizon 2033.',
	'intro.sneddAxes': 'Axes stratégiques',
	'intro.sneddGlobal': 'Objectifs globaux',
	'intro.sneddSpecific': 'Objectifs spécifiques',
	'intro.sneddHint': '↓ Les 5 axes stratégiques de la SNEDD sont présentés ci-dessous.',

	'axes.label': 'SNEDD 2024–2033',
	'axes.title': '5 Axes Stratégiques',
	'axes.globalObjectives': 'Objectifs\nglobaux',
	'axes.specificObjectives': 'Objectifs\nspécifiques',
	'axes.viewSpecific': 'Explorer les objectifs spécifiques',
	'axes.viewGlobal': 'Voir les objectifs globaux',

	'projects.label': 'Mise en œuvre de la vision',
	'projects.title': '11 Projets Structurants',
	'projects.desc':
		'Onze projets intégrateurs et fédérateurs constituent le moteur de la Vision Mali 2063.',
	'projects.saheliaTitle': 'Des questions sur les projets structurants ?',
	'projects.saheliaDesc':
		'SaheL\'IA peut répondre à vos questions sur les 11 projets, leurs indicateurs et leurs liens avec les axes stratégiques.',
	'projects.saheliaBtn': 'Poser une question →',

	'indicators.label': 'Trajectoire de la Vision',
	'indicators.title': 'Indicateurs clés',
	'indicators.desc':
		'Les engagements de la Vision Mali 2063 sont mesurables. Trajectoires officielles — baseline, cible 2033 et cible 2063.',
	'indicators.growthPts': ' pts/an',
	'indicators.growthPerYear': '/an',
	'indicators.reduceBy': 'Réduire de',
	'indicators.increaseBy': 'Augmenter de',
	'indicators.perYearUntil2033': 'par an jusqu\'en 2033',
	'indicators.chartAria': 'Trajectoire {label}',
	'indicators.year': 'Année',
	'indicators.saheliaTitle': 'Des questions sur les indicateurs ?',
	'indicators.saheliaDesc':
		'SaheL\'IA peut répondre à vos questions sur les trajectoires, les cibles 2033 et 2063, et l\'ensemble de la Vision Mali 2063.',
	'indicators.saheliaBtn': 'Poser une question →',

	'indicateursPage.title': 'Indicateurs clés',
	'indicateursPage.desc':
		'Les engagements de la Vision Mali 2063 sont mesurables. Trajectoires officielles — baseline, cible 2033 et cible 2063 de quelques indicateurs clés.',
	'indicateursPage.metaTitle': 'Indicateurs — mali2063.org',

	'footer.aboutTitle': 'Mali 2063',
	'footer.aboutDesc':
		'Une lecture indépendante de la Vision Mali 2063 - pour les citoyens, la diaspora, la société civile et le secteur privé.',
	'footer.poweredBy': 'Powered by',
	'footer.navTitle': 'Navigation',
	'footer.home': 'Accueil',
	'footer.axesTitle': 'Les 5 Axes (SNEDD 2024–2033)',
	'footer.newsletterTitle': 'Restez informés',
	'footer.newsletterDesc':
		'Recevez les nouvelles analyses et mises à jour de la plateforme.',
	'footer.newsletterPlaceholder': 'votre@email.com',
	'footer.newsletterConfirm':
		'✓ Merci — vous serez notifié des prochaines publications.',
	'footer.contactTitle': 'Contact',
	'footer.legal':
		'Plateforme indépendante. Non affiliée au Gouvernement du Mali.',
	'footer.copy': '© {year} Sahel Analytics · Licence GPL v3 · Open Source',

	'chat.openAria': 'Ouvrir l\'assistant',
	'chat.toggleLabel': 'Demande à SaheL\'IA',
	'chat.name': 'SaheL\'IA',
	'chat.tagline': 'Ton assistant pour comprendre la Vision Mali 2063',
	'chat.welcome':
		'Bonjour ! Je suis SaheL\'IA. Pose-moi tes questions sur la Vision Mali 2063, la SNEDD, les projets structurants, ou Sahel Analytics.',
	'chat.placeholder': 'Pose ta question...',
	'chat.error': 'Une erreur est survenue. Veuillez réessayer.',
	'chat.footer': 'Powered by Sahel Analytics'
} as const;

const en: Record<keyof typeof fr, string> = {
	'lang.switch': 'FR',
	'lang.switchAria': 'Switch to French',
	'lang.current': 'EN',

	'nav.vision': 'Vision',
	'nav.indicators': 'Indicators',

	'hero.subtitle':
		'An independent reading of the Mali 2063 Vision - for citizens, the diaspora, civil society, and the private sector.',
	'hero.scroll': 'Scroll down',

	'intro.referenceLabel': 'The reference framework',
	'intro.visionTitle': 'Mali 2063 Vision',
	'intro.visionCoverAlt':
		'Mali Kura 2063 Vision — official cover (PDF on finances.ml)',
	'intro.visionParagraph':
		'In December 2024, the Government of Mali published the Mali Kura 2063 Vision (MALI KURA NƐTAASIRA KA BƐN SAN 2063 MA) — a forty-year national development framework organized around 4 ten-year phases and 11 flagship projects covering the entire Malian territory.',
	'intro.phasesLabel': 'The 4 ten-year phases',
	'intro.phase1.name': 'Refoundation (SNEDD)',
	'intro.phase1.desc':
		'Stabilization, institutional reforms, and first structural transformations.',
	'intro.phase2.name': 'Specialization',
	'intro.phase2.desc': 'Building competitiveness and economic specialization by sector.',
	'intro.phase3.name': 'Human Development',
	'intro.phase3.desc': 'High level of human development, social well-being, and international standing.',
	'intro.phase4.name': 'Consolidation',
	'intro.phase4.desc':
		'Consolidating gains and positioning Mali as an African model.',
	'intro.phaseAria': 'Phase {n}',
	'intro.sneddLabel': 'The operational strategy',
	'intro.sneddTitle': 'SNEDD 2024–2033',
	'intro.sneddP1':
		'The National Sustainable Development Strategy 2024–2033 (SNEDD) is the operational framework for the first decade of the Mali 2063 Vision. It translates long-term ambitions into measurable objectives and concrete actions for the next ten years.',
	'intro.sneddP2':
		'The SNEDD is organized around 5 strategic axes, 13 global objectives, and 38 specific objectives — each with tracking indicators, baseline values, and 2033 targets.',
	'intro.sneddAxes': 'Strategic axes',
	'intro.sneddGlobal': 'Global objectives',
	'intro.sneddSpecific': 'Specific objectives',
	'intro.sneddHint': '↓ The 5 strategic axes of the SNEDD are presented below.',

	'axes.label': 'SNEDD 2024–2033',
	'axes.title': '5 Strategic Axes',
	'axes.globalObjectives': 'Global\nobjectives',
	'axes.specificObjectives': 'Specific\nobjectives',
	'axes.viewSpecific': 'Explore specific objectives',
	'axes.viewGlobal': 'View global objectives',

	'projects.label': 'Implementing the vision',
	'projects.title': '11 Flagship Projects',
	'projects.desc':
		'Eleven integrative, unifying projects drive the Mali 2063 Vision.',
	'projects.saheliaTitle': 'Questions about the flagship projects?',
	'projects.saheliaDesc':
		'SaheL\'IA can answer your questions about the 11 projects, their indicators, and their links to the strategic axes.',
	'projects.saheliaBtn': 'Ask a question →',

	'indicators.label': 'Vision trajectory',
	'indicators.title': 'Key indicators',
	'indicators.desc':
		'The commitments of the Mali 2063 Vision are measurable. Official trajectories - baseline, 2033 target, and 2063 target.',
	'indicators.growthPts': ' pts/yr',
	'indicators.growthPerYear': '/yr',
	'indicators.reduceBy': 'Reduce by',
	'indicators.increaseBy': 'Increase by',
	'indicators.perYearUntil2033': 'per year until 2033',
	'indicators.chartAria': 'Trajectory {label}',
	'indicators.year': 'Year',
	'indicators.saheliaTitle': 'Questions about the indicators?',
	'indicators.saheliaDesc':
		'SaheL\'IA can answer your questions about trajectories, 2033 and 2063 targets, and the Mali 2063 Vision as a whole.',
	'indicators.saheliaBtn': 'Ask a question →',

	'indicateursPage.title': 'Key indicators',
	'indicateursPage.desc':
		'The commitments of the Mali 2063 Vision are measurable. Official trajectories - baseline, 2033 target, and 2063 target for key indicators.',
	'indicateursPage.metaTitle': 'Indicators — mali2063.org',

	'footer.aboutTitle': 'Mali 2063',
	'footer.aboutDesc':
		'An independent reading of the Mali 2063 Vision - for citizens, the diaspora, civil society, and the private sector.',
	'footer.poweredBy': 'Powered by',
	'footer.navTitle': 'Navigation',
	'footer.home': 'Home',
	'footer.axesTitle': 'The 5 Axes (SNEDD 2024–2033)',
	'footer.newsletterTitle': 'Stay informed',
	'footer.newsletterDesc':
		'Receive new analyses and platform updates.',
	'footer.newsletterPlaceholder': 'you@email.com',
	'footer.newsletterConfirm':
		'✓ Thank you — you will be notified of upcoming publications.',
	'footer.contactTitle': 'Contact',
	'footer.legal':
		'Independent platform. Not affiliated with the Government of Mali.',
	'footer.copy': '© {year} Sahel Analytics · GPL v3 License · Open Source',

	'chat.openAria': 'Open assistant',
	'chat.toggleLabel': 'Ask SaheL\'IA',
	'chat.name': 'SaheL\'IA',
	'chat.tagline': 'Your assistant to understand the Mali 2063 Vision',
	'chat.welcome':
		'Hello! I\'m SaheL\'IA. Ask me about the Mali 2063 Vision, the SNEDD, flagship projects, or Sahel Analytics.',
	'chat.placeholder': 'Ask your question...',
	'chat.error': 'An error occurred. Please try again.',
	'chat.footer': 'Powered by Sahel Analytics'
};

export type MessageKey = keyof typeof fr;

export const messages: Record<Locale, Record<MessageKey, string>> = { fr, en };

export function interpolate(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}
