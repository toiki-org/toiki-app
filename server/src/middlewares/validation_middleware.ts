import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import express from 'express'
import HttpException from '../exceptions/http_exception'

type Kind = 'body' | 'query' | 'params'

function validationMiddleware<T extends Object>(
  kind: Kind,
  type: ClassConstructor<T>
): express.RequestHandler {
  return async (req, _, next) => {
    const toValidate = req[kind]
    const errors = await validate(plainToInstance(type, toValidate))
    if (errors.length > 0) {
      // format error message
      const message = errors
        .map((error: ValidationError) => {
          if (!error.constraints)
            return 'Please provide all the necessary fields'
          return Object.values(error.constraints)
        })
        .join(', ')

      return next(new HttpException(400, message))
    }
    next()
  }
}

export default validationMiddleware
