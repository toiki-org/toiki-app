import express, { Express } from 'express'
import { inject, injectable } from 'tsyringe'
import morgan from 'morgan'
import cors from 'cors'
import { TYPES } from './utils/constants'
import ConvertController from './controllers/convert'
import BaseController from './interfaces/base_controller'
import errorMiddleware from './middlewares/error_middleware'
import HealthController from './controllers/health'
import { Logger } from './utils/logger'

@injectable()
export class App {
  public app: Express
  private logger = new Logger(App.name)

  constructor(
    @inject(TYPES.ConvertController)
    convertController: ConvertController,
    @inject(TYPES.HealthController)
    healthController: HealthController
  ) {
    console.log('app', convertController, healthController)
    this.app = express()

    this.initializeMiddleware()
    this.initializeControllers([convertController, healthController])
    // error middleware should always be last
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      this.logger.i(`App running on port ${process.env.PORT}`)
    })
  }

  private initializeMiddleware() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
      })
    )
    this.app.use(morgan('dev'))
  }

  private initializeControllers(controllers: BaseController[]) {
    for (const controller of controllers) {
      this.app.use('/api', controller.router)
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}
