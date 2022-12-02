import * as dotenv from 'dotenv'

import express, { NextFunction, Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'

import { router } from './routes'

dotenv.config()

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', [process.env.HOST_URL ?? ''])
  res.setHeader('Content-Type', 'application/json')

  next()
})

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Server running.',
  })
})

app.use('/api/', router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  res.status(404).json({
    message: err.toString(),
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
