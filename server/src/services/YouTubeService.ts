import { YouTubeRepository } from '../repositories/YouTubeRepository'

export class YouTubeService {
  readonly repository = new YouTubeRepository()

  readonly searchVideoId = async (query: string) => {
    const res = await this.repository.search(query)

    if (res.length === 0) {
      return undefined
    }

    return res[0].id
  }
}
