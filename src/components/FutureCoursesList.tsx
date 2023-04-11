import { useCallback, useContext, useMemo } from 'react'

import { localStorage } from '../utils/localStorage'

import { CourseContext } from '../contexts/Course.context'

import type { Course } from '../@types'

export function FutureCoursesList() {
  const { setCourse, setIsFocused } = useContext(CourseContext)

  const courses = useMemo(() => {
    const data = localStorage.getItem<Course[]>('studies')

    const courseInFocus = localStorage.getItem<Course>('focused_course')

    if (data) {
      return data.filter((item) => item.title !== courseInFocus?.title)
    } else {
      return []
    }
  }, [])

  const handleSelectCourse = useCallback(
    (course: Course) => {
      setCourse(course)

      setIsFocused(false)
    },
    [setCourse, setIsFocused],
  )

  return (
    <>
      <ul className="mt-10">
        <h2 className="mb-5 text-zinc-500 text-xs font-medium tracking-widest">
          FUTURE COURSES
        </h2>

        {courses.map((course) => (
          <li
            key={course.url}
            className="flex flex-col items-start mb-3 hover:cursor-pointer relative"
            onClick={() => handleSelectCourse(course)}
          >
            <span className="text-zinc-700 font-medium text-[13px] uppercase">
              {course.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
