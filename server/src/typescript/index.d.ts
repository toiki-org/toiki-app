export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_SEARCH_ENGINE_CX?: string
      HOST_URL?: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      SPOTIFY_CLIENT_ID?: string
      SPOTIFY_CLIENT_SECRET?: string
      USE_CONVERSION_V2?: string
      YOUTUBE_API_KEY?: string
    }
  }
}
