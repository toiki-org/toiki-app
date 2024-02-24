import { google, type youtube_v3 } from 'googleapis';
import { injectable } from 'tsyringe';
import { IYoutubeService } from '../interfaces/i_youtube_service';
import { Logger } from '../utils/logger';

@injectable()
export class YoutubeService implements IYoutubeService {
  private youtubeApi: youtube_v3.Youtube;

  constructor() {
    this.logger.i('initializing Youtube API...');
    this.youtubeApi = google.youtube('v3');
    this.logger.i('Youtube API initialized');
  }

  private logger = new Logger(YoutubeService.name);

  public readonly searchVideoId = async (query: string) => {
    const res = await this.youtubeApi.search
      .list({
        auth: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: query,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? []);

    if (res.length === 0) {
      return undefined;
    }

    return res[0].id;
  };

  public readonly getTrackInfo = async (id: string) => {
    const res = await this.youtubeApi.videos
      .list({
        id: [id],
        part: ['snippet'],
        auth: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? []);

    if (res.length === 0) {
      return undefined;
    }

    return res[0];
  };

  public readonly searchAlbumId = async (query: string) => {
    const res = await this.youtubeApi.search
      .list({
        auth: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        q: query,
        maxResults: 1,
        type: ['playlist'],
      })
      .then((v) => v.data.items ?? []);

    if (res.length === 0) {
      return undefined;
    }

    return res[0].id;
  };

  public readonly getAlbumInfo = async (id: string) => {
    const res = await this.youtubeApi.playlists
      .list({
        id: [id],
        part: ['snippet'],
        auth: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
      })
      .then((v) => v.data.items ?? []);

    if (res.length === 0) {
      return undefined;
    }

    return res[0];
  };
}
