import { Request, Response, NextFunction } from 'express'

import JSONResponse from '../utils/json_response'
import BaseController from '../interfaces/base_controller'
import validationMiddleware from '../middlewares/validation_middleware'
import HttpException from '../exceptions/http_exception'
import { Controller, Handler } from '../decorators/routing'
import ConvertInput from '../interfaces/convert_input'
import { inject, injectable } from 'tsyringe'
import { TYPES } from '../utils/constants'
import { ConversionService } from '../services/conversion_service'
import { isYoutubeOrSpotify } from 'toiki-common'

@injectable()
@Controller()
export default class ConvertController extends BaseController {
  constructor(
    @inject(TYPES.ConversionService)
    private readonly conversionService: ConversionService
  ) {
    super()
  }

  @Handler('get', '/convert', validationMiddleware('query', ConvertInput))
  async convert(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const url = req.query['url'] as string

      const matchResult = isYoutubeOrSpotify(url)

      if (matchResult == null) {
        return next(new HttpException(400, 'Invalid request params.'))
      }

      let result: { url: string; embedUrl: string }

      const id = matchResult.id

      if (matchResult.type === 'spotify') {
        if (matchResult.kind === 'album') {
          result = await this.conversionService.convertSpotifyAlbum(id)
        } else {
          result = await this.conversionService.convertSpotifyTrack(id)
        }
      } else {
        if (matchResult.kind === 'album') {
          result = await this.conversionService.convertYoutubeAlbum(id)
        } else {
          if (process.env.USE_CONVERSION_V2 === 'true') {
            result = await this.conversionService.convertYoutubeTrackV2(id)
          } else {
            result = await this.conversionService.convertYoutubeTrack(id)
          }
        }
      }
      JSONResponse.success(res, result)
    } catch (e) {
      if (e instanceof HttpException) {
        next(e)
      } else {
        console.error(e)
        next(new HttpException(500))
      }
    }
  }
}
