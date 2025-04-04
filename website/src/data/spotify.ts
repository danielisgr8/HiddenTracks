class SpotifyClient {
  private static validMessageRegex = /^[a-zA-Z .]+$/;
  private static maxMessageLength = 32;

  public listSongsForEncoding(message: string) {
    if (!SpotifyClient.validMessageRegex.test(message)) throw new Error('Message is not valid: ' + message);
    if (message.length > SpotifyClient.maxMessageLength) throw new Error(`Message is longer than max length of ${SpotifyClient.maxMessageLength}`);
  }
}

export {
  SpotifyClient
};
