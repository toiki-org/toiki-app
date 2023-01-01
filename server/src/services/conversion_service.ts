import { inject, injectable } from 'tsyringe'
import HttpException from '../exceptions/http_exception'
import { TYPES } from '../utils/constants'
import { SpotifyService } from './spotify_service'
import { YoutubeService } from './youtube_service'

@injectable()
export class ConversionService {
  constructor(
    @inject(TYPES.SpotifyService)
    private readonly spotifyService: SpotifyService,
    @inject(TYPES.YoutubeService)
    private readonly youtubeService: YoutubeService
  ) {}

  async convertYoutubeUrl(id: string) {
    if (!id) {
      throw new HttpException(400, 'Invalid Youtube track url')
    }

    const youtubeTrack = await this.youtubeService.getTrackInfo(id)

    if (youtubeTrack === undefined) {
      throw new HttpException(400, 'Invalid Youtube track url')
    }

    const trackTitle = youtubeTrack.snippet?.title

    if (!trackTitle) {
      throw new HttpException(400, 'Invalid Youtube track url')
    }

    const spotifyResult = await this.spotifyService.searchVideoId(trackTitle)

    const spotifyTrack = spotifyResult.tracks?.items[0]

    if (!spotifyTrack) {
      throw new HttpException(404, 'Track not found')
    }

    const spotifyTrackId = spotifyTrack.id

    const spotifyTrackUrl = `https://open.spotify.com/track/${spotifyTrackId}`

    return spotifyTrackUrl
  }

  async convertSpotifyUrl(id: string) {
    if (!id) {
      throw new HttpException(400, 'Invalid Spotify track url')
    }

    const spotifyTrack = await this.spotifyService.getTrackInfo(id)

    const youtubeVideo = await this.youtubeService.searchVideoId(
      spotifyTrack.name
    )

    const youtubeVideoId = youtubeVideo?.videoId

    if (youtubeVideoId === undefined || youtubeVideoId === null) {
      throw new HttpException(404, 'Youtube video not found')
    }

    const youtubeVideoUrl = `https://www.youtube.com/watch?v=${youtubeVideo?.videoId}`

    return youtubeVideoUrl
  }
}
