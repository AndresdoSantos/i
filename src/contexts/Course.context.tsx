import { Dispatch, createContext } from 'react'

import type { Course } from '../@types'

type Props = {
  course: Course | null
  setCourse: Dispatch<Course | null>

  isFocused: boolean
  setIsFocused: Dispatch<boolean>
}

export const CourseContext = createContext({} as Props)
