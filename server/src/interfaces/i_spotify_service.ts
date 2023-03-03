export interface ISpotifyService {
  searchVideoId(query: string): Promise<SpotifyApi.SearchResponse>
  getTrackInfo(id: string): Promise<SpotifyApi.SingleTrackResponse>
}
