import type { LayoutLoad } from './$types';
import { parseLocaleParam } from '$lib/i18n';

export const load: LayoutLoad = ({ url }) => {
	const urlLocale = parseLocaleParam(url.searchParams.get('lang'));
	return { urlLocale };
};
