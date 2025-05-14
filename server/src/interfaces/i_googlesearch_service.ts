import { customsearch_v1 } from 'googleapis'

export interface IGooglesearchService {
  search(
    query: string,
    siteSearch: string
  ): Promise<customsearch_v1.Schema$Result[]>
}
