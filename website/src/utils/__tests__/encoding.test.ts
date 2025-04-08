import { DurationDigitSum, firstLetterOfSongToValue, getSongProperties } from "../encoding";

describe('Encoding', () => {
  test('There are no encoding collisions', () => {
    const durationDigitSumToYearToFirstLetterToEncodingId: Record<number, Record<string, Record<string, number>>> = {};
    for (let i = 0; i < 3420; i++) {
      const properties = getSongProperties(i);

      expect(properties.durationDigitSum === DurationDigitSum.ZeroToTwo || properties.durationDigitSum === DurationDigitSum.ThreeToFive || properties.durationDigitSum === DurationDigitSum.SixToNine).toBe(true);
      expect(Number(properties.year) >= 1965 && Number(properties.year) <= 2024).toBe(true);
      expect(properties.firstLetterOfSong in firstLetterOfSongToValue).toBe(true);

      durationDigitSumToYearToFirstLetterToEncodingId[properties.durationDigitSum] ||= {};
      durationDigitSumToYearToFirstLetterToEncodingId[properties.durationDigitSum][properties.year] ||= {};
      if (properties.firstLetterOfSong in durationDigitSumToYearToFirstLetterToEncodingId[properties.durationDigitSum][properties.year]) {
        throw new Error(`Collision between encoding IDs ${i} and ${durationDigitSumToYearToFirstLetterToEncodingId[properties.durationDigitSum][properties.year][properties.firstLetterOfSong]}`);
      }

      durationDigitSumToYearToFirstLetterToEncodingId[properties.durationDigitSum][properties.year][properties.firstLetterOfSong] = i;
    }
  });
});
