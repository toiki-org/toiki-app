import { inject, injectable } from 'tsyringe'
import HttpException from '../exceptions/http_exception'
import { ISpotifyService } from '../interfaces/i_spotify_service'
import { IYoutubeService } from '../interfaces/i_youtube_service'
import { TYPES } from '../utils/constants'
import { Logger } from '../utils/logger'

@injectable()
export class ConversionService {
  private logger = new Logger(ConversionService.name)

  constructor(
    @inject(TYPES.SpotifyService)
    private readonly spotifyService: ISpotifyService,
    @inject(TYPES.YoutubeService)
    private readonly youtubeService: IYoutubeService
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

    const channelTitle = youtubeTrack.snippet?.channelTitle

    if (!channelTitle) {
      throw new HttpException(400, 'Invalid Youtube track url')
    }

    const spotifyResult = await this.spotifyService.searchVideoId(
      `${trackTitle} ${channelTitle}`
    )

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

    const artistsString = spotifyTrack.artists.join(' ')

    const youtubeVideo = await this.youtubeService.searchVideoId(
      `${spotifyTrack.name} ${artistsString}`
    )

    const youtubeVideoId = youtubeVideo?.videoId

    if (youtubeVideoId === undefined || youtubeVideoId === null) {
      throw new HttpException(404, 'Youtube video not found')
    }

    const youtubeVideoUrl = `https://www.youtube.com/watch?v=${youtubeVideo?.videoId}`

    return youtubeVideoUrl
  }
}
