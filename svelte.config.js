import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csrf: {
			trustedOrigins: ['https://mali2063.org', 'https://www.mali2063.org']
		}
	}
};

export default config;
