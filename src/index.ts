import { YouTubeService } from './services/YouTubeService'

const youTubeService = new YouTubeService()

const main = async () => {
  const video = await youTubeService.searchVideoId('algo')

  console.log(video)
}

main()
