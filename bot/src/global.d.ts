export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      API_URL: string;
    }
  }
}
