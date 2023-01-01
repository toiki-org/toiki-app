import SpotifyWebApi from 'spotify-web-api-node'
import { injectable } from 'tsyringe'
import { Logger } from '../utils/logger'

@injectable()
export class SpotifyService {
  private spotifyApi: SpotifyWebApi

  constructor() {
    this.logger.i('initializing Spotify API...')
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    })
    this.initializeService()
  }

  private logger = new Logger(SpotifyService.name)

  async initializeService() {
    const response = await this.spotifyApi.clientCredentialsGrant()
    this.spotifyApi.setAccessToken(response.body.access_token)
    this.logger.i('Spotify API initialized')
  }

  readonly searchVideoId = async (query: string) => {
    const res = await this.spotifyApi.search(query, ['track'], { limit: 1 })

    return res.body
  }

  readonly getTrackInfo = async (id: string) => {
    const res = await this.spotifyApi.getTrack(id)

    return res.body
  }
}
