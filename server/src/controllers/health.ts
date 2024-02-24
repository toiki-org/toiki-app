import { Request, Response, NextFunction } from 'express'

import JSONResponse from '../utils/json_response'
import BaseController from '../interfaces/base_controller'
import { Controller, Handler } from '../decorators/routing'
import { injectable } from 'tsyringe'

@injectable()
@Controller()
export default class HealthController extends BaseController {
  @Handler('get', '/health')
  async health(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    JSONResponse.success(res, {
      message: 'Server running',
    })
  }
}
