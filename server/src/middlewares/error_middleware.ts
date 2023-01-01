import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/http_exception'
import JSONResponse from '../utils/json_response'

function errorMiddleware(
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
) {
  const status = error.status
  const message = error.message
  const data = error.data
  JSONResponse.error(response, status, message, data)
}

export default errorMiddleware
