import 'server-only';
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
	try {
		console.log("Fetching Hume access token...");
		if (!process.env.HUME_API_KEY || !process.env.HUME_CLIENT_SECRET) {
			throw new Error("HUME_API_KEY or HUME_CLIENT_SECRET is not set");
		}
		const accessToken = await fetchAccessToken({
			apiKey: process.env.HUME_API_KEY,
			secretKey: process.env.HUME_CLIENT_SECRET,
		});

		console.log("Received access token:", accessToken);

		if (typeof accessToken === 'undefined' || accessToken === null) {
			console.error("Access token is undefined or null");
			throw new Error("Failed to retrieve access token");
		}

		return accessToken;
	} catch (error) {
		console.error("Error fetching Hume access token:", error);
		if (error instanceof Error) {
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}
		throw error;
	}
}