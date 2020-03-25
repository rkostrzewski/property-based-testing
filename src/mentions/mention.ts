const escapeMessage = (text: string) => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const unescapeMessage = (text: string) => text
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')

export const createMentionTag = (type: string, payload: object): string => {
  const content = escapeMessage(JSON.stringify(payload))

  return `<@${type}:${content}>`
};

export const parseMentionTag = (mentionTag: string): null | { type: string, payload: any } => {
  const mentionRegex = /<@(\w+):({[^<>]*})>/g
  const result = mentionRegex.exec(mentionTag)

  if (result === null) {
    return null
  }
  const [,type,payload] = result

  return { type, payload: JSON.parse(unescapeMessage(payload))}
}