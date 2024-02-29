import { Request, Response, NextFunction } from 'express';
import { isYoutubeOrSpotify } from '@toiki/common';

import JSONResponse from '../utils/json_response';
import BaseController from '../interfaces/base_controller';
import validationMiddleware from '../middlewares/validation_middleware';
import HttpException from '../exceptions/http_exception';
import { Controller, Handler } from '../decorators/routing';
import ConvertInput from '../interfaces/convert_input';
import { inject, injectable } from 'tsyringe';
import { TYPES } from '../utils/constants';
import { ConversionService } from '../services/conversion_service';

// ORDER IS IMPORTANT!!
@injectable()
@Controller()
export default class ConvertController extends BaseController {
  constructor(
    @inject(TYPES.ConversionService)
    private readonly conversionService: ConversionService
  ) {
    super();
  }

  @Handler('get', '/convert', validationMiddleware('query', ConvertInput))
  async convert(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const url = req.query['url'] as string;

      const matchResult = isYoutubeOrSpotify(url);

      if (matchResult == null) {
        return next(new HttpException(400, 'Invalid request params.'));
      }

      let result: string;

      const id = matchResult.id;

      if (matchResult.type === 'spotify') {
        if (matchResult.kind === 'album') {
          result = await this.conversionService.convertSpotifyAlbum(id);
        } else {
          result = await this.conversionService.convertSpotifyTrack(id);
        }
      } else {
        if (matchResult.kind === 'album') {
          result = await this.conversionService.convertYoutubeAlbum(id);
        } else {
          result = await this.conversionService.convertYoutubeTrack(id);
        }
      }
      JSONResponse.success(res, {
        url: result,
      });
    } catch (e) {
      if (e instanceof HttpException) {
        next(e);
      } else {
        console.error(e);
        next(new HttpException(500));
      }
    }
  }
}
