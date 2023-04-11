import { useCallback, useContext, useMemo } from 'react'

import { localStorage } from '../utils/localStorage'

import { CourseContext } from '../contexts/Course.context'

import type { Course } from '../@types'

export function CourseInFocus() {
  const { setCourse, setIsFocused } = useContext(CourseContext)

  const course = useMemo(() => {
    const data = localStorage.getItem<Course>('focused_course')

    return data
  }, [])

  const handleSelectCourse = useCallback(
    (course: Course) => {
      setCourse(course)

      setIsFocused(true)
    },
    [setCourse, setIsFocused],
  )

  return course ? (
    <>
      <h2 className="mt-10 mb-5 text-zinc-500 text-xs font-medium tracking-widest">
        FOCUS
      </h2>

      <li
        key={course.url}
        className="flex flex-col items-start mb-3 hover:cursor-pointer relative"
        onClick={() => handleSelectCourse(course)}
      >
        <span className="text-zinc-700 font-medium text-[13px] uppercase">
          {course.title}
        </span>
      </li>
    </>
  ) : null
}
