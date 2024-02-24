export interface ISpotifyService {
  searchVideoId(query: string): Promise<SpotifyApi.SearchResponse>
  searchAlbumId(query: string): Promise<SpotifyApi.SearchResponse>
  getTrackInfo(id: string): Promise<SpotifyApi.SingleTrackResponse>
  getAlbumInfo(id: string): Promise<SpotifyApi.SingleAlbumResponse>
}
