enum DurationDigitSum {
  ZeroToTwo,
  ThreeToFive,
  SixToNine,
}

interface SongProperties {
  durationDigitSum: DurationDigitSum;
  year: string;
  firstLetterOfSong: string;
}

const characterToValue = {
  '\0':  0,
  ' ':   1,
  '.':   2,
  'A':   3,
  'B':   4,
  'C':   5,
  'D':   6,
  'E':   7,
  'F':   8,
  'G':   9,
  'H':  10,
  'I':  11,
  'J':  12,
  'K':  13,
  'L':  14,
  'M':  15,
  'N':  16,
  'O':  17,
  'P':  18,
  'Q':  19,
  'R':  20,
  'S':  21,
  'T':  22,
  'U':  23,
  'V':  24,
  'W':  25,
  'X':  26,
  'Y':  27,
  'Z':  28,
  'a':  29,
  'b':  30,
  'c':  31,
  'd':  32,
  'e':  33,
  'f':  34,
  'g':  35,
  'h':  36,
  'i':  37,
  'j':  38,
  'k':  39,
  'l':  40,
  'm':  41,
  'n':  42,
  'o':  43,
  'p':  44,
  'q':  45,
  'r':  46,
  's':  47,
  't':  48,
  'u':  49,
  'v':  50,
  'w':  51,
  'x':  52,
  'y':  53,
  'z':  54,
};

const valueToCharacter = Object.fromEntries(Object.entries(characterToValue).map(([char, value]) => [value, char]));

// Omits uncommon letters X, Z, Q, J, Y, V, and K
const firstLetterOfSongToValue = {
  'A':  0,
  'B':  1,
  'C':  2,
  'D':  3,
  'E':  4,
  'F':  5,
  'G':  6,
  'H':  7,
  'I':  8,
  'L':  9,
  'M': 10,
  'N': 11,
  'O': 12,
  'P': 13,
  'R': 14,
  'S': 15,
  'T': 16,
  'U': 17,
  'W': 18,
};

const valueToFirstLetterOfSong = Object.fromEntries(Object.entries(firstLetterOfSongToValue).map(([char, value]) => [value, char]));

const getSongProperties = (encodingId: number): SongProperties => {
  const durationDigitSumIntermediate = Math.floor(encodingId / 1140);
  const durationDigitSum = durationDigitSumIntermediate === 0
    ? DurationDigitSum.ZeroToTwo
    : durationDigitSumIntermediate === 1
      ? DurationDigitSum.ThreeToFive
      : DurationDigitSum.SixToNine;
  const year = 1965 + Math.floor(encodingId % 1140 / 19);
  const firstLetterOfSongValue = encodingId % 1140 % 19;
  const firstLetterOfSong = valueToFirstLetterOfSong[firstLetterOfSongValue];

  return {
    durationDigitSum,
    year: String(year),
    firstLetterOfSong,
  };
}

export {
  characterToValue,
  valueToCharacter,
  firstLetterOfSongToValue,
  valueToFirstLetterOfSong,
  getSongProperties,
  DurationDigitSum,
  SongProperties
};
