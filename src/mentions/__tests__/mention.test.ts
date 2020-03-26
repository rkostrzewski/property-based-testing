import fc from 'fast-check'
import { createMentionTag, parseMentionTag } from '../mention'

describe('mentions', () => {
  it('every mention tag when parsed should equal original mention', () => {
    const typeArbitrary = fc.string().filter(s => /^\w+$/.test(s))
    const payloadArbitrary = fc.object()

    const isReversible = fc.property(
      typeArbitrary,
      payloadArbitrary,
      (type, payload) => {
        const mentionTag = createMentionTag(type, payload)
        const parsed = parseMentionTag(mentionTag)

        expect(parsed).toEqual({ type, payload })
      }
    )

    fc.assert(isReversible, {
      numRuns: 10000,
    })
  })
})































// actual object that can be used with JSON.stringify / JSON.parse
const copyMe = fc.unicodeJsonObject()
.filter(o => {
  if(typeof o !== 'object') {
    return false
  }
  if (Array.isArray(o)) {
    return false
  }

  return !!o
})
.map(o => o as object)