import clsx from 'clsx'
import { useContext, useState } from 'react'

import { ScheduleStudy } from './ScheduleStudy'
import { FutureCoursesList } from './FutureCoursesList'
import { CourseInFocus } from './CourseInFocus'
import { CourseSettings } from './CourseSettings'

import { StudyingContext } from '../contexts/Studying.context'
import { ModuleContext } from '../contexts/Module.context'
import { CourseContext } from '../contexts/Course.context'

import type { Course } from '../@types'

export function Studies() {
  const { module } = useContext(ModuleContext)

  const [isStudying, setIsStudying] = useState(false)

  const [course, setCourse] = useState<Course | null>(null)

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={clsx(
        'transition-transform duration-700 absolute inset-0 w-screen h-screen bg-white',
        {
          'translate-x-[calc(100vw_-_100vw)]': module === 'studies',
          '-translate-x-[100vw]': module === null || module !== 'studies',
        },
      )}
    >
      <StudyingContext.Provider value={{ isStudying, setIsStudying }}>
        <div className="mx-auto max-w-5xl pt-20">
          <header className="flex items-center justify-between">
            <section>
              <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
                My studies
              </h1>
              <span className="text-xs text-zinc-500">
                Demonstration of what I have studied.
              </span>
            </section>

            <ScheduleStudy />
          </header>

          <CourseContext.Provider
            value={{
              course,
              setCourse,

              isFocused,
              setIsFocused,
            }}
          >
            <CourseInFocus />

            <FutureCoursesList />

            <CourseSettings />
          </CourseContext.Provider>
        </div>
      </StudyingContext.Provider>
    </div>
  )
}
