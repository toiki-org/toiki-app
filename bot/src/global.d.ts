export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      API_URL: string;
      REPORT_CHANNEL_ID: string;
      HOME_GUILD_ID: string;
    }
  }
}
