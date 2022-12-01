import { SpotifyService } from './services/SpotifyService'
import { YouTubeService } from './services/YouTubeService'

const authenticationSpotifyService = new SpotifyService(undefined)
const youTubeService = new YouTubeService()

const main = async () => {
  const accessToken = await authenticationSpotifyService.getAppAccessToken()

  const spotifyService = new SpotifyService(accessToken)

  const spotifyTrackUrl = ''

  const [_, spotifyTrackId] = spotifyTrackUrl.match(
    /^https:\/\/.*\/track\/(\w+)/
  ) ?? [undefined, undefined]

  if (spotifyTrackId === undefined) {
    throw new Error('Invalid Spotify track url.')
  }

  const spotifyTrack = await spotifyService.getTrackInfo(spotifyTrackId)

  const youTubeVideo = await youTubeService.searchVideoId(spotifyTrack.name)

  const youTubeVideoId = youTubeVideo?.videoId

  if (youTubeVideoId === undefined || youTubeVideoId === null) {
    throw new Error('YouTube video not found.')
  }

  const youTubeVideoUrl = `https://www.youtube.com/watch?v=${youTubeVideo?.videoId}`

  console.log(youTubeVideoUrl)
}

main()
