import { MaxInt, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { characterToValue, DurationDigitSum, getSongProperties, SongProperties } from '../utils/encoding';

class SpotifyClient {
  private static searchPageSize: MaxInt<50> = 20;
  private static validMessageRegex = /^[a-zA-Z .]+$/;
  private static maxMessageLength = 32;

  private sdk: SpotifyApi;

  constructor(sdk: SpotifyApi) {
    this.sdk = sdk;
  }

  private static trackIsValid(track: Track, songProperties: SongProperties) {
    const nameCondition = track.name.length >= 1
      && songProperties.firstLetterOfSong.length >= 1
      && track.name.charAt(0).toLocaleLowerCase() === songProperties.firstLetterOfSong.charAt(0).toLocaleLowerCase();

    const releaseYear = track.album.release_date.split('-')[0];
    const yearCondition = releaseYear === songProperties.year;

    const durationDigitSum = track.duration_ms.toString()
      .split('')
      .map((digitChar) => Number(digitChar))
      .reduce((prev, curr) => prev + curr)
      % 10;
    const durationCondition = songProperties.durationDigitSum === DurationDigitSum.ZeroToTwo
      ? durationDigitSum <= 2
      : songProperties.durationDigitSum === DurationDigitSum.ThreeToFive
        ? durationDigitSum >= 3 && durationDigitSum <= 5
        : durationDigitSum >= 6;

    return nameCondition && yearCondition && durationCondition;
  }

  private static getEncodingId(input: [keyof typeof characterToValue, keyof typeof characterToValue | undefined]) {
    return input[1] !== undefined
      ? characterToValue[input[0]] * 55 + characterToValue[input[1]]
      : characterToValue[input[0]];
  };

  private async search(songProperties: SongProperties): Promise<Track | undefined> {
    const query = `track:${songProperties.firstLetterOfSong} year:${songProperties.year}`;
    let searchOffset = 0;
    let track: Track | undefined;
    while (track === undefined && searchOffset / SpotifyClient.searchPageSize < 3) {
      const results = await this.sdk.search(query, ['track'], 'US', SpotifyClient.searchPageSize, searchOffset);
      track = results.tracks.items.find((track) => SpotifyClient.trackIsValid(track, songProperties));
      searchOffset += results.tracks.total;
    }

    if (track === undefined) {
      console.log('Unable to find track for properties: ', songProperties);
    }

    return track;
  };

  public async listSongsForEncoding(message: string): Promise<Track[]> {
    if (!SpotifyClient.validMessageRegex.test(message)) throw new Error('Message is not valid: ' + message);
    if (message.length > SpotifyClient.maxMessageLength) throw new Error(`Message is longer than max length of ${SpotifyClient.maxMessageLength}`);

    // split into groups of 2 (last item has 1 if only 1 character was remaining)
    const groups = [...message.matchAll(/..?/g)].map((match) => match[0]);
    const songs: Track[] = [];
    for (const group of groups) {
      const encodingId = SpotifyClient.getEncodingId(group.split('') as [keyof typeof characterToValue, keyof typeof characterToValue | undefined]);
      const songProperties = getSongProperties(encodingId);
      const track = await this.search(songProperties);
      if (track === undefined) {
        throw new Error('Unable to find songs to encode message');
      }
      songs.push(track);
    }

    return songs;
  }
}

export {
  SpotifyClient,
};
