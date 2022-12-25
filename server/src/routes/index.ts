import * as yup from 'yup'

import { NextFunction, Request, Response, Router } from 'express'
import { SpotifyService } from '../services/SpotifyService'
import { YouTubeService } from '../services/YouTubeService'
import { isYoutubeOrSpotify } from '../utils/isYoutubeOrSpotify'

const authenticationSpotifyService = new SpotifyService(undefined)
const youTubeService = new YouTubeService()

export const router = Router()

router.get('/convert-url', async (req, res, next) => {
  const isValid = await yup
    .object()
    .shape({
      url: yup.string().required().url(),
    })
    .isValid(req.query)

  if (!isValid) {
    return next(new Error('Invalid request params.'))
  }

  const url = req.query['url'] as string

  const matchResult = isYoutubeOrSpotify(url)

  if (matchResult == null) {
    return next(new Error('Invalid request params.'))
  }

  if (matchResult.type === 'spotify') {
    return spotifyToYoutube(matchResult.id, res, next)
  } else {
    return youtubeToSpotify(matchResult.id, res, next)
  }
})

const spotifyToYoutube = async (id: string, res: Response, next: NextFunction) => {
  const accessToken = await authenticationSpotifyService.getAppAccessToken()

  const spotifyService = new SpotifyService(accessToken)

  const spotifyTrackId = id

  if (spotifyTrackId === undefined) {
    return next(new Error('Invalid Spotify track url.'))
  }

  const spotifyTrack = await spotifyService.getTrackInfo(spotifyTrackId)

  const youTubeVideo = await youTubeService.searchVideoId(spotifyTrack.name)

  const youTubeVideoId = youTubeVideo?.videoId

  if (youTubeVideoId === undefined || youTubeVideoId === null) {
    return next(new Error('YouTube video not found.'))
  }

  const youTubeVideoUrl = `https://www.youtube.com/watch?v=${youTubeVideo?.videoId}`

  console.log(youTubeVideoUrl)

  res.status(200).json({
    url: youTubeVideoUrl,
  })
}


const youtubeToSpotify = async (id: string, res: Response, next: NextFunction) => {
  const accessToken = await authenticationSpotifyService.getAppAccessToken()

  const spotifyService = new SpotifyService(accessToken)

  const youtubeTrackId = id

  if (youtubeTrackId === undefined) {
    return next(new Error('Invalid Youtube track url.'))
  }

  const youtubeTrack = await youTubeService.getTrackInfo(youtubeTrackId)

  if (youtubeTrack === undefined) {
    return next(new Error('Invalid Youtube track url.'))
  }

  const trackTitle = youtubeTrack.snippet?.title

  if (!trackTitle) {
    return next(new Error('Invalid Youtube track url.'))
  }

  const spotifyResult = await spotifyService.searchVideoId(trackTitle)

  const spotifyTrack = spotifyResult.tracks?.items[0]

  if (!spotifyTrack) {
    return next(new Error('Invalid Youtube track url.'))
  }

  const spotifyTrackId = spotifyTrack.id

  if (spotifyTrackId === undefined || spotifyTrackId === null) {
    return next(new Error('YouTube video not found.'))
  }

  const spotifyTrackUrl = `https://open.spotify.com/track/${spotifyTrackId}`

  console.log(spotifyTrackUrl)

  res.status(200).json({
    url: spotifyTrackUrl,
  })
}
