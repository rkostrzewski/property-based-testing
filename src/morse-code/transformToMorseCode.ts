export type AlphaNumericCharacters = 
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' |
  'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' |
  'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | ' ' |
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type MorseCodeMap = { [k in AlphaNumericCharacters]: string }

const morseCodeMap: MorseCodeMap = {
  ' ': ' ',
  A: '·—',
  B: '—···',
  C: '—·—·',
  D: '—··',
  E: '·',
  F: '··—·',
  G: '——·',
  H: '····',
  I: '··',
  J: '·———',
  K: '—·—',
  L: '·—··',
  M: '——',
  N: '—·',
  O: '———',
  P: '·——·',
  Q: '——·—',
  R: '·—·',
  S: '···',
  T: '—',
  U: '··—',
  V: '···—',
  W: '·——',
  X: '—··—',
  Y: '—·——',
  Z: '——··',
  1: '·————',
  2: '··———',
  3: '···——',
  4: '····—',
  5: '·····',
  6: '—····',
  7: '——···',
  8: '———··',
  9: '————·',
  0: '—————'
}
export const transformToMorseCode = (input: AlphaNumericCharacters[]): string[] =>
  input.map(i => morseCodeMap[i])