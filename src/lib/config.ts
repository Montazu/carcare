export const getConfig = () => {
	const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

	if (!ACCESS_TOKEN) {
		throw new Error('Missing ACCESS_TOKEN environment variable');
	}

	if (!REFRESH_TOKEN) {
		throw new Error('Missing REFRESH_TOKEN environment variable');
	}

	return { ACCESS_TOKEN, REFRESH_TOKEN };
};
