import { Request, Response, NextFunction } from 'express'

import JSONResponse from '../utils/json_response'
import BaseController from '../interfaces/base_controller'
import { Controller, Handler } from '../decorators/routing'
import { injectable } from 'tsyringe'

@injectable()
@Controller()
export default class HealthController extends BaseController {
  @Handler('get', '/health')
  async health(req: Request, res: Response, next: NextFunction): Promise<any> {
    JSONResponse.success(res, {
      message: 'Server running',
    })
  }
}
