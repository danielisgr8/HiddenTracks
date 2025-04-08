import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { any, mock, MockProxy } from 'jest-mock-extended';
import { SpotifyClient } from '../spotify';

interface TrackSummary {
  releaseYear: number;
  durationMs: number;
  name: string;
}

const getSdkTrack = (track: TrackSummary) => ({
  album: {
    album_group: '',
    artists: [],
    album_type: '',
    available_markets: [],
    copyrights: [],
    external_ids: {
      upc: '',
      isrc: '',
      ean: ''
    },
    external_urls: {
      spotify: ''
    },
    genres: [],
    href: '',
    id: '',
    images: [],
    label: '',
    name: '',
    popularity: 23,
    release_date: String(track.releaseYear),
    release_date_precision: 'year',
    total_tracks: 1,
    type: '',
    uri: ''
  },
  external_ids: {
    upc: '',
    isrc: '',
    ean: ''
  },
  popularity: 34,
  artists: [],
  available_markets: [],
  disc_number: 1,
  duration_ms: track.durationMs,
  episode: false,
  explicit: false,
  external_urls: {
    spotify: ''
  },
  href: '',
  id: '',
  is_local: false,
  name: track.name,
  preview_url: null,
  track: true,
  track_number: 1,
  type: 'track',
  uri: ''
});

const getSdkResponse = ({ limit, offset, tracks }: {
  limit: number,
  offset: number,
  tracks: TrackSummary[],
}) => ({
  tracks: {
    items: tracks.map(getSdkTrack),
    href: '',
    limit,
    next: null,
    offset,
    previous: null,
    total: tracks.length,
  },
});

describe('SpotifyClient', () => {
  let mockedSdk: MockProxy<SpotifyApi>;
  let client: SpotifyClient;

  beforeEach(() => {
    mockedSdk = mock<SpotifyApi>();
    client = new SpotifyClient(mockedSdk);
  });

  test('Throws error if message uses invalid characters', async () => {
    const message = 'I\'m invalid';
    await expect(async () => {
      await client.listSongsForEncoding(message);
    }).rejects.toThrow();
  });
  
  test('Throws an error if message is too long', async () => {
    const message = 'a really long message that should be too long to be sent this better throw an error or im gonna get perturbed'
    await expect(async () => {
      await client.listSongsForEncoding(message);
    }).rejects.toThrow();
  });

  test('Handles message with even number of characters', async () => {
    /*
      'Da' => Encoding ID 359
        Duration digit sum: 0-2
        Year: 1983
        First letter: U
      'ni' => Encoding ID 2347
        Duration digit sum: 6-9
        Year: 1968
        First letter: M
      'el' => Encoding ID 1855
        Duration digit sum: 3-5
        Year: 2002
        First letter: O
    */
    const message = 'Daniel';

    const matchingTrack1 = { releaseYear: 1983, durationMs: 112233, name: 'uboat' };
    const matchingTrack2 = { releaseYear: 1968, durationMs: 63,     name: 'Mighty Mouse' };
    const matchingTrack3 = { releaseYear: 2002, durationMs: 99999,  name: 'oblate spheroid' };
    mockedSdk.search
      .calledWith('track:U year:1983', any(), any(), 20, 0)
      .mockResolvedValueOnce(getSdkResponse({
        limit: 20,
        offset: 0,
        tracks: [
          { releaseYear: 1983, durationMs: 123, name: 'Underwater' },
          { releaseYear: 2011, durationMs: 92,  name: 'Underwater' },
          { releaseYear: 1983, durationMs: 435, name: 'Overwater'  },
        ],
      }));
    mockedSdk.search
      .calledWith('track:U year:1983', any(), any(), 20, 3)
      .mockResolvedValueOnce(getSdkResponse({
        limit: 20,
        offset: 3,
        tracks: [matchingTrack1],
      }));
    mockedSdk.search
      .calledWith('track:M year:1968', any(), any(), 20, 0)
      .mockResolvedValueOnce(getSdkResponse({
        limit: 20,
        offset: 0,
        tracks: [
          { releaseYear: 2024, durationMs: 111, name: 'Green bean'  },
          matchingTrack2
        ],
      }));
    mockedSdk.search
      .calledWith('track:O year:2002', any(), any(), 20, 0)
      .mockResolvedValueOnce(getSdkResponse({
        limit: 20,
        offset: 0,
        tracks: [matchingTrack3],
      }));

    const actualTracks = await client.listSongsForEncoding(message);

    expect(actualTracks).toStrictEqual([matchingTrack1, matchingTrack2, matchingTrack3].map(getSdkTrack));
    expect(mockedSdk.search).toHaveBeenCalledTimes(4);
  });

  test.todo('Handles message with odd number of characters');
  test.todo('Throws error when Spotify API does not return valid track');
});
