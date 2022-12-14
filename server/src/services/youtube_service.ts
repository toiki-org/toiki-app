import { google, youtube_v3 } from 'googleapis'
import { injectable } from 'tsyringe'
import { Logger } from '../utils/logger'

@injectable()
export class YoutubeService {
  private youtubeApi: youtube_v3.Youtube

  constructor() {
    this.logger.i('initializing Youtube API...')
    this.youtubeApi = google.youtube('v3')
    this.logger.i('Youtube API initialized')
  }

  private logger = new Logger(YoutubeService.name)

  readonly searchVideoId = async (query: string) => {
    const res = await this.youtubeApi.search
      .list({
        auth: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: query,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? [])

    if (res.length === 0) {
      return undefined
    }

    return res[0].id
  }

  readonly getTrackInfo = async (id: string) => {
    const res = await this.youtubeApi.search
      .list({
        auth: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: id,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? [])

    if (res.length === 0) {
      return undefined
    }

    return res[0]
  }
}
