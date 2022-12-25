export const youtubeRegexes = [/.*(youtu\.be|youtube.com|music.youtube.com)\/watch\?v=(\w+)?(?=(\&|$))/, /.*(youtu\.be|youtube.com)\/(\w+)?(?=(\?|$))/]
export const spotifyRegex = /.*open.spotify.com\/track\/(\w+)?(?=\?|$)/

interface Match {
  type: 'spotify' | 'youtube';
  id: string;
}

export const isYoutubeOrSpotify = (url: string): Match | null => {
  const spotifyMatch = url.match(spotifyRegex)
  if (spotifyMatch != null && spotifyMatch.length > 1) {
    return {
      type: 'spotify',
      id: spotifyMatch[1]
    }
  }
  let youtubeMatch = url.match(youtubeRegexes[0]) ?? url.match(youtubeRegexes[1])
  if (youtubeMatch != null && youtubeMatch.length > 1) {
    return {
      type: 'youtube',
      id: youtubeMatch[2]
    }
  }
  return null
}
