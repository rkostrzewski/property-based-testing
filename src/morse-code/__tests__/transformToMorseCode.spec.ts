import _ from 'lodash'
import fc from 'fast-check'
import { transformToMorseCode, AlphaNumericCharacters } from "../transformToMorseCode"

describe('transformToMorseCode', () => {
  /**
   * Approach 1: Do some example testing
   */
  it.each<{ input: AlphaNumericCharacters[], expected: string[] }>([
    {
      input: ['S', 'O', 'S'],
      expected: ['···', '———', '···']
    }
  ])('should match some examples - %#', ({ input, expected: out }) => {
    const actual = transformToMorseCode(input)

    expect(actual).toEqual(out)
  })

  /**
   * Approach 2: Check some properties
   */

  // Generate all letters
  const letters = _.range(0, 26).map(i => String.fromCharCode('A'.charCodeAt(0) + i)) as AlphaNumericCharacters[]
  // Generate all numbers
  const numbers = _.range(0, 10) as AlphaNumericCharacters[]
  const alphanumericCharacters = [...letters, ...numbers]

  // fc.constantFrom means randomly choose from provided values
  const alphanumericCharacterArbitrary = fc.constantFrom(...alphanumericCharacters)
  // array of any length containing alphanumeric characters
  const inputArbitrary = fc.array(alphanumericCharacterArbitrary)

  it('should always respond with array of same length', () => {
    const responseHasSameLength = fc.property(
      inputArbitrary,
      input => {
        const output = transformToMorseCode(input)

        expect(output).toHaveLength(input.length)
      }
    )

    fc.assert(responseHasSameLength)
  })

  it('should respond differently to different characters', () => {
    const responseHasSameLength = fc.property(
      // Generate first character
      alphanumericCharacterArbitrary,
      // Generate second character
      alphanumericCharacterArbitrary,
      (first, second) => {
        // fc.pre - skips the test if the condition isn't satisfied
        fc.pre(first !== second)
        const firstOutput = transformToMorseCode([first])
        const secondOutput = transformToMorseCode([second])

        expect(firstOutput).not.toEqual(secondOutput)
      }
    )

    fc.assert(responseHasSameLength, {
      numRuns: 10000
    })
  })
})