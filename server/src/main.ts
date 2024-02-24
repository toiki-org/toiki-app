import 'dotenv/config'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { App } from './app'
import { initDiContainer } from './utils/di'

const main = async () => {
  initDiContainer()

  const app = container.resolve(App)

  app.listen()
}

main()
