import { container } from 'tsyringe'
import ConvertController from '../controllers/convert'
import HealthController from '../controllers/health'
import { ConversionService } from '../services/conversion_service'
import { SpotifyService } from '../services/spotify_service'
import { YoutubeService } from '../services/youtube_service'
import { TYPES } from './constants'

export const initDiContainer = () => {
  container.register<YoutubeService>(TYPES.YoutubeService, {
    useClass: YoutubeService,
  })
  container.register<SpotifyService>(TYPES.SpotifyService, {
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
