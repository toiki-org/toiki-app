import { google, type customsearch_v1 } from 'googleapis'
import { injectable } from 'tsyringe'
import { Logger } from '../utils/logger'
import { IGooglesearchService } from '../interfaces/i_googlesearch_service'

@injectable()
export class GooglesearchService implements IGooglesearchService {
  private readonly customsearchApi: customsearch_v1.Customsearch
  private readonly logger = new Logger(GooglesearchService.name)

  constructor() {
    this.logger.i('initializing Google Search API...')
    this.customsearchApi = google.customsearch('v1')
    this.logger.i('Google Search API initialized')
  }

  public readonly search = async (query: string, siteSearch: string) => {
    const res = await this.customsearchApi.cse.list({
      auth: process.env.YOUTUBE_API_KEY,
      cx: process.env.GOOGLE_SEARCH_ENGINE_CX,
      hl: 'en-US',
      siteSearch: siteSearch,
      siteSearchFilter: 'i',
      q: query,
    })

    return res.data.items ?? []
  }
}
