import { inject, injectable } from 'tsyringe'
import HttpException from '../exceptions/http_exception'
import { ISpotifyService } from '../interfaces/i_spotify_service'
import { IYoutubeService } from '../interfaces/i_youtube_service'
import { TYPES } from '../utils/constants'
import { Logger } from '../utils/logger'
import { IGooglesearchService } from '../interfaces/i_googlesearch_service'

@injectable()
export class ConversionService {
  private readonly logger = new Logger(ConversionService.name)

  constructor(
    @inject(TYPES.GooglesearchService)
    private readonly googlesearchService: IGooglesearchService,
    @inject(TYPES.SpotifyService)
    private readonly spotifyService: ISpotifyService,
    @inject(TYPES.YoutubeService)
    private readonly youtubeService: IYoutubeService
  ) {}

  async convertYoutubeTrack(id: string) {
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

    const query = `${channelTitle.replace(' - Topic', '')} - ${trackTitle}`

    const spotifyResult = await this.spotifyService.searchVideoId(query)

    const spotifyTrack = spotifyResult.tracks?.items[0]

    if (!spotifyTrack) {
      throw new HttpException(404, 'Track not found')
    }

    const spotifyTrackId = spotifyTrack.id

    const spotifyTrackUrl = `https://open.spotify.com/track/${spotifyTrackId}`
    const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}`

    return {
      embedUrl: spotifyEmbedUrl,
      query,
      url: spotifyTrackUrl,
    }
  }

  async convertYoutubeTrackV2(id: string) {
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

    const query = `spotify - ${channelTitle.replace(
      ' - Topic',
      ''
    )} - ${trackTitle}`

    const results = await this.googlesearchService.search(
      query,
      'https://open.spotify.com/track'
    )

    if (results.length === 0) {
      throw new HttpException(404, 'Track not found')
    }

    const track = results[0]

    const spotifyUrlMatch = track.link?.match(
      /https:\/\/open.spotify.com\/track\/(\w+)/
    )

    if (!spotifyUrlMatch) {
      throw new HttpException(400, 'Invalid Spotify track url')
    }

    const metadataMatch = track.title?.match(
      /^(.+) - song and lyrics by (.+) \| Spotify$/
    )

    return {
      artist: !metadataMatch ? '' : metadataMatch[2],
      embedUrl: `https://open.spotify.com/embed/track/${spotifyUrlMatch[1]}`,
      query,
      title: !metadataMatch ? '' : metadataMatch[1],
      url: `https://open.spotify.com/track/${spotifyUrlMatch[1]}`,
    }
  }

  async convertYoutubeAlbum(id: string) {
    if (!id) {
      throw new HttpException(400, 'Invalid Youtube album url')
    }

    const youtubeAlbum = await this.youtubeService.getAlbumInfo(id)

    if (youtubeAlbum === undefined) {
      throw new HttpException(400, 'Invalid Youtube album url')
    }

    const albumTitle = youtubeAlbum.snippet?.title

    if (!albumTitle) {
      throw new HttpException(400, 'Invalid Youtube album url')
    }

    const channelTitle = youtubeAlbum.snippet?.channelTitle

    if (!channelTitle) {
      throw new HttpException(400, 'Invalid Youtube album url')
    }

    const spotifyResult = await this.spotifyService.searchAlbumId(
      `${albumTitle} ${channelTitle}`
    )

    const spotifyAlbum = spotifyResult.albums?.items[0]

    if (!spotifyAlbum) {
      throw new HttpException(404, 'Album not found')
    }

    const spotifyAlbumId = spotifyAlbum.id

    const spotifyAlbumUrl = `https://open.spotify.com/album/${spotifyAlbumId}`
    const spotifyEmbedUrl = `https://open.spotify.com/embed/album/${spotifyAlbumId}`

    return {
      url: spotifyAlbumUrl,
      embedUrl: spotifyEmbedUrl,
    }
  }

  async convertSpotifyTrack(id: string) {
    if (!id) {
      throw new HttpException(400, 'Invalid Spotify track url')
    }

    const spotifyTrack = await this.spotifyService.getTrackInfo(id)

    const artistsString = spotifyTrack.artists
      .map((artist) => artist.name)
      .join(' ')

    const youtubeVideo = await this.youtubeService.searchVideoId(
      `${spotifyTrack.name} ${artistsString}`
    )

    const youtubeVideoId = youtubeVideo?.videoId

    if (youtubeVideoId === undefined || youtubeVideoId === null) {
      throw new HttpException(404, 'Youtube video not found')
    }

    const youtubeVideoUrl = `https://www.youtube.com/watch?v=${youtubeVideo?.videoId}`
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideo?.videoId}`

    return {
      url: youtubeVideoUrl,
      embedUrl: youtubeEmbedUrl,
    }
  }

  async convertSpotifyAlbum(id: string) {
    if (!id) {
      throw new HttpException(400, 'Invalid Spotify album url')
    }

    const spotifyAlbum = await this.spotifyService.getAlbumInfo(id)

    const artistsString = spotifyAlbum.artists
      .map((artist) => artist.name)
      .join(' ')

    const youtubePlaylist = await this.youtubeService.searchAlbumId(
      `${spotifyAlbum.name} ${artistsString}`
    )

    const youtubePlaylistId = youtubePlaylist?.playlistId

    if (youtubePlaylistId === undefined || youtubePlaylistId === null) {
      throw new HttpException(404, 'Youtube playlist not found')
    }

    const youtubePlaylistUrl = `https://www.youtube.com/playlist?list=${youtubePlaylistId}`
    const youtubeEmbedUrl = `https://www.youtube.com/embed?listType=playlist&list=${youtubePlaylistId}`

    return {
      url: youtubePlaylistUrl,
      embedUrl: youtubeEmbedUrl,
    }
  }
}
