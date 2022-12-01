import SpotifyWebApi from 'spotify-web-api-node'

export class SpotifyRepository {
  constructor(accessToken: string | undefined) {
    if (accessToken !== undefined) {
      this.service.setAccessToken(accessToken)
    }
  }

  readonly service = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  })

  readonly authorizeApp = async () => {
    return await this.service.clientCredentialsGrant()
  }

  readonly getTrack = async (id: string) => {
    return await this.service.getTrack(id)
  }
}
