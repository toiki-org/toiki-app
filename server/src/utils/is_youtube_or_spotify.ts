export interface Match {
  type: 'spotify' | 'youtube'
  id: string
  kind: 'track' | 'album'
}

interface Matcher {
  regex: RegExp[]
  idIndex: number
  match: Omit<Match, 'id'>
}

const matches: Matcher[] = [
  {
    regex: [
      /.*(youtu\.be|youtube.com|music.youtube.com)\/watch\?v=((\w|-)+)?(?=(\&|$))/,
      /.*(youtu\.be|youtube.com)\/((?!playlist)(\w|-)+)?(?=(\?|$))/,
    ],
    idIndex: 2,
    match: {
      type: 'youtube',
      kind: 'track',
    },
  },
  {
    regex: [
      /.*(youtube.com|music.youtube.com)\/playlist\?list=((\w|-)+)?(?=(\&|$))/,
    ],
    idIndex: 2,
    match: {
      type: 'youtube',
      kind: 'album',
    },
  },
  {
    regex: [/.*open.spotify.com\/track\/(\w+)?(?=\?|$)/],
    idIndex: 1,
    match: {
      type: 'spotify',
      kind: 'track',
    },
  },
  {
    regex: [/.*open.spotify.com\/album\/(\w+)?(?=\?|$)/],
    idIndex: 1,
    match: {
      type: 'spotify',
      kind: 'album',
    },
  },
]

export const isYoutubeOrSpotify = (url: string): Match | null => {
  for (const matcher of matches) {
    const match = matcher.regex
      .map((regex) => url.match(regex))
      .find((v) => v != null)
    if (!!match && match.length > 1) {
      return {
        ...matcher.match,
        id: match[matcher.idIndex],
      }
    }
  }

  return null
}
