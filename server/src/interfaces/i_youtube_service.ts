import { youtube_v3 } from 'googleapis'
export interface IYoutubeService {
  searchVideoId(
    query: string
  ): Promise<youtube_v3.Schema$ResourceId | undefined>
  searchAlbumId(
    query: string
  ): Promise<youtube_v3.Schema$ResourceId | undefined>
  getTrackInfo(id: string): Promise<youtube_v3.Schema$Video | undefined>
  getAlbumInfo(id: string): Promise<youtube_v3.Schema$Playlist | undefined>
}
