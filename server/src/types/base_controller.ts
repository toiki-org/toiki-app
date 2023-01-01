import { Router } from 'express'
import { Route } from './route'

abstract class BaseController {
  public router = Router()
  public _path = ''
  public _routes?: Route[]
  public _name?: string
  public mapRoutes() {
    this._routes?.forEach((method) => {
      const path = this._path + method.path
      this.router[method.method](
        path,
        ...method.middleware,
        method.callback.bind(this)
      )
      console.info(
        `[Router] mapped ${method.method.toUpperCase()} ${path} to {${
          this._name
        }.${method.name}}`
      )
    })
  }
}

export default BaseController
