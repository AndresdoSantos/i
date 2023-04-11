type Path = 'studies' | 'triggers' | 'focused_course'

type As = 'object' | 'list'

export const localStorage = {
  setItem<T>(path: Path, data: T, as?: As) {
    if (as === 'object') {
      window.localStorage.setItem(`@i:${path}`, JSON.stringify(data))
    } else {
      const prevData = window.localStorage.getItem(`@i:${path}`)

      const parsedData = prevData
        ? (JSON.parse(window.localStorage.getItem(`@i:${path}`)!) as T[])
        : []

      window.localStorage.setItem(
        `@i:${path}`,
        JSON.stringify([...parsedData, data]),
      )
    }
  },
  getItem<T>(path: Path) {
    const data = window.localStorage.getItem(`@i:${path}`)

    return data ? (JSON.parse(data) as T) : null
  },
}
