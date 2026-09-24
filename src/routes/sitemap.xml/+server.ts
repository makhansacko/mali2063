import type { RequestHandler } from './$types';

const pages = ['/', '/indicateurs', '/suivi', '/apropos', '/analyses'];

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;
	const urls = pages.map((path) => `${origin}${path}`);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(loc) => `  <url>
    <loc>${loc}</loc>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
