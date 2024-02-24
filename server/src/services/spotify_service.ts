import SpotifyWebApi from 'spotify-web-api-node'
import { injectable } from 'tsyringe'
import { ISpotifyService } from '../interfaces/i_spotify_service'
import { Logger } from '../utils/logger'

@injectable()
export class SpotifyService implements ISpotifyService {
  private spotifyApi: SpotifyWebApi

  constructor() {
    this.logger.i('initializing Spotify service...')
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    })
    this.initializeService()
  }

  private logger = new Logger(SpotifyService.name)

  private async initializeService() {
    await this.refreshToken()
    // every 50 minutes
    setInterval(this.refreshToken.bind(this), 50 * 60 * 1000)
    this.logger.i('Spotify service initialized')
  }

  private async refreshToken() {
    const response = await this.spotifyApi.clientCredentialsGrant()
    this.spotifyApi.setAccessToken(response.body.access_token)
    this.logger.i('Spotify access token refreshed')
  }

  public readonly searchVideoId = async (query: string) => {
    const res = await this.spotifyApi.search(query, ['track'], { limit: 1 })

    return res.body
  }

  public readonly searchAlbumId = async (query: string) => {
    const res = await this.spotifyApi.search(query, ['album'], { limit: 1 })

    return res.body
  }

  public readonly getTrackInfo = async (id: string) => {
    const res = await this.spotifyApi.getTrack(id)

    return res.body
  }

  public readonly getAlbumInfo = async (id: string) => {
    const res = await this.spotifyApi.getAlbum(id)

    return res.body
  }
}
