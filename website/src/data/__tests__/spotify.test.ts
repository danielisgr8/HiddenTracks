import { SpotifyClient } from "../spotify";

describe('SpotifyClient', () => {
  let client: SpotifyClient;

  beforeEach(() => {
    client = new SpotifyClient();
  });

  test('Throws error if message uses invalid characters', () => {
    const message = 'I\'m invalid';
    expect(() => client.listSongsForEncoding(message)).toThrow();
  });
  
  test('Throws an error if message is too long', () => {
    const message = 'a really long message that should be too long to be sent this better throw an error or im gonna get perturbed'
    expect(() => client.listSongsForEncoding(message)).toThrow();
  });

  test('Does not throw an error for good input', () => {
    const message = 'hello';
    expect(() => client.listSongsForEncoding(message)).not.toThrow();
  });
});
