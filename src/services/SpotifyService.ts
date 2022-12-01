import { SpotifyRepository } from '../repositories/SpotifyRepository'

export class SpotifyService {
  constructor(accessToken: string | undefined) {
    this.repository = new SpotifyRepository(accessToken)
  }

  repository!: SpotifyRepository

  readonly getAppAccessToken = async () => {
    const res = await this.repository.authorizeApp()

    return res.body.access_token
  }

  readonly getTrackInfo = async (id: string) => {
    const res = await this.repository.getTrack(id)

    return res.body
  }
}
