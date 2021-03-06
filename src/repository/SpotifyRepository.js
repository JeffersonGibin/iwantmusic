const axios = require("axios")
const {
	SPOTIFY_API_URL,
	SPOTIFY_ACCOUNT_API_URL
} = require("../constants/SpotifyConstant")

const Notify = require('../Notify')

const getToken = async () => {
	const mixinClientSecretID = process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET_ID
	const basicAuthToken = new Buffer.from(mixinClientSecretID).toString('base64')

	return await axios({
		method: 'post',
		url: SPOTIFY_ACCOUNT_API_URL + '/api/token',
		headers: {
			'Authorization': 'Basic ' + basicAuthToken,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: {
			grant_type: 'client_credentials'
		},
		json: true,
	})
		.then(body => body.data.access_token)
}

const getPlayListByGenre = async (seed_genrer) => {
	try {
		const token = await getToken()

		if (!token || !seed_genrer) throw Error()

		const REQUEST_URL = [
			SPOTIFY_API_URL,
			"/recommendations?",
			"seed_genres=",
			seed_genrer
		].join("")

		const playlist = await axios.get(REQUEST_URL, {
			headers: { 'Authorization': "Bearer " + token }
		})
			.then(response => response.data)

		return playlist.tracks.map((item) => ({
			track: item.name,
			artists: item.artists.map((artist) => artist.name),
			album: item.album.name
		})) || []

	} catch (error) {
		Notify.emit("onIntegrationError", "[Integration Spotify Error ] " + error)
	}
}

module.exports = {
	getPlayListByGenre
}