import slugify from 'slugify'

export function makeSlug(text: string) {
  return slugify(text.toLowerCase())
}
