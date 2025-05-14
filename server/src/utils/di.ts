import { container } from 'tsyringe'
import ConvertController from '../controllers/convert'
import HealthController from '../controllers/health'
import { ISpotifyService } from '../interfaces/i_spotify_service'
import { IYoutubeService } from '../interfaces/i_youtube_service'
import { ConversionService } from '../services/conversion_service'
import { SpotifyService } from '../services/spotify_service'
import { YoutubeService } from '../services/youtube_service'
import { TYPES } from './constants'
import { IGooglesearchService } from '../interfaces/i_googlesearch_service'
import { GooglesearchService } from '../services/googlesearch_service'

export const initDiContainer = () => {
  container.register<IGooglesearchService>(TYPES.GooglesearchService, {
    useClass: GooglesearchService,
  })
  container.register<IYoutubeService>(TYPES.YoutubeService, {
    useClass: YoutubeService,
  })
  container.register<ISpotifyService>(TYPES.SpotifyService, {
    useClass: SpotifyService,
  })
  container.register<ConversionService>(TYPES.ConversionService, {
    useClass: ConversionService,
  })
  container.register<ConvertController>(TYPES.ConvertController, {
    useClass: ConvertController,
  })
  container.register<HealthController>(TYPES.HealthController, {
    useClass: HealthController,
  })
}
