import express, { NextFunction, Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'

import { router } from './routes'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send('Server running.')
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
