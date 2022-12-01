import { google } from 'googleapis'

export class YouTubeRepository {
  readonly service = google.youtube('v3')

  readonly search = async (query: string) => {
    return await this.service.search
      .list({
        auth: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: query,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? [])
  }
}
