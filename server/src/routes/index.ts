import * as yup from 'yup'

import { Router } from 'express'
import { SpotifyService } from '../services/SpotifyService'
import { YouTubeService } from '../services/YouTubeService'

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

  const accessToken = await authenticationSpotifyService.getAppAccessToken()

  const spotifyService = new SpotifyService(accessToken)

  const spotifyTrackUrl = req.query['url'] as string

  const [_, spotifyTrackId] = spotifyTrackUrl.match(
    /^https:\/\/.*\/track\/(\w+)/
  ) ?? [undefined, undefined]

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
})
