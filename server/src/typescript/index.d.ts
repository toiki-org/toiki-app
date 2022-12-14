export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST_URL?: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      SPOTIFY_CLIENT_ID?: string
      SPOTIFY_CLIENT_SECRET?: string
      YOUTUBE_API_KEY?: string
    }
  }
}
