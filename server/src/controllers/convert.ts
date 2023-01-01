import { Request, Response, NextFunction } from 'express'

import JSONResponse from '../utils/json_response'
import BaseController from '../types/base_controller'
import validationMiddleware from '../middlewares/validation_middleware'
import HttpException from '../exceptions/http_exception'
import { Controller, Handler } from '../decorators/routing'
import ConvertInput from '../types/convert_input'
import { inject, injectable } from 'tsyringe'
import { TYPES } from '../utils/constants'
import { ConversionService } from '../services/conversion_service'
import { isYoutubeOrSpotify } from '../utils/is_youtube_or_spotify'

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

      let result: string

      if (matchResult.type === 'spotify') {
        result = await this.conversionService.convertSpotifyUrl(matchResult.id)
      } else {
        result = await this.conversionService.convertYoutubeUrl(matchResult.id)
      }
      JSONResponse.success(res, {
        url: result,
      })
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
