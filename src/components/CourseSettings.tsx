import {
  Check,
  CheckCircle,
  PlayCircle,
  Target,
  X,
  XCircle,
} from '@phosphor-icons/react'
import clsx from 'clsx'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { LessonItemForm } from './LessonItemForm'

import { makeSlug } from '../utils/makeSlug'
import { localStorage } from '../utils/localStorage'

import { CourseContext } from '../contexts/Course.context'

import type { Course, Todo, TodoList } from '../@types'

export function CourseSettings() {
  const { course, setCourse, isFocused } = useContext(CourseContext)

  const slug = makeSlug(course?.title || '')

  const [showUncompletedTasks, setShowUncompletedTasks] = useState(false)

  const handleChangeShowUncompletedTasks = useCallback(() => {
    setShowUncompletedTasks((prevState) => !prevState)
  }, [])

  const [tasks, setTasks] = useState<TodoList>(() => ({
    data: [],
    path: '',
  }))

  const handleChangeTask = useCallback(
    (task: Todo) => {
      const completedTask: Todo = {
        completed: !task.completed,
        title: task.title,
      }

      setTasks((prevState) => {
        const differentTasks = prevState.data.filter(
          (item) => item.title !== task.title,
        )

        window.localStorage.setItem(
          `@i:${slug}`,
          JSON.stringify({
            data: [completedTask, ...differentTasks],
            path: prevState.path,
          }),
        )

        return {
          data: [completedTask, ...differentTasks],
          path: prevState.path,
        }
      })
    },
    [slug],
  )

  const handleFocusACourse = useCallback(() => {
    localStorage.setItem('focused_course', course, 'object')
  }, [course])

  const handleSelectCourse = useCallback(
    (course: Course | null) => {
      setCourse(course)
    },
    [setCourse],
  )

  useEffect(() => {
    const data = window.localStorage.getItem(`@i:${slug}`)

    if (data) {
      setTasks(JSON.parse(data) as TodoList)
    } else {
      setTasks({ data: [], path: '' })
    }
  }, [slug])

  const percentage = useMemo(() => {
    return (
      (tasks.data.filter((item) => item.completed).length / tasks.data.length) *
      100
    )
  }, [tasks.data])

  return (
    <aside
      className={clsx(
        'absolute right-0 top-0 bottom-0 border-l transition-transform duration-500 w-[30rem] px-5 bg-white shadow-xl',
        {
          'translate-x-[calc(30rem)] invisible': course === null,
          'translate-x-0 visible': course,
        },
      )}
    >
      <section className="flex flex-row items-center gap-4 pt-20 mb-10">
        <button onClick={() => handleSelectCourse(null)}>
          <X
            size={20}
            weight="regular"
            className="text-red-500 transition-[:hover] duration-300 hover:rotate-180"
          />
        </button>

        <div className="border rounded-full py-1 px-3">
          <p className="text-zinc-700 font-bold text-[13px]">
            {percentage}%{' '}
            <span className="text-[11px] font-medium">OF PROGRESS</span>
          </p>
        </div>
      </section>

      <header className="flex flex-col">
        <h1 className="font-light text-zinc-700 flex items-center h-12 text-xl truncate -tracking-wider uppercase">
          {course?.title}
        </h1>

        <section className="flex flex-wrap gap-2 my-5">
          <a
            href={course?.url}
            target="_blank"
            className="flex items-center gap-2 text-[10px] text-zinc-600 font-medium rounded-full border p-1 pr-4"
            rel="noreferrer"
          >
            <PlayCircle size={20} weight="duotone" className="text-cyan-500" />
            START STUDY
          </a>

          <button
            className={clsx(
              'flex items-center gap-2 text-[10px] font-medium rounded-full border p-1 pr-4 text-zinc-600',
              {
                hidden: isFocused,
              },
            )}
            onClick={() => handleFocusACourse()}
          >
            <Target size={20} weight="duotone" className="text-orange-500" />
            {isFocused ? 'KEEP FOCUSED' : 'FOCUS'}
          </button>

          <button
            className="flex items-center gap-2 text-[10px] text-zinc-600 font-medium rounded-full border p-1 pr-4"
            onClick={() => handleChangeShowUncompletedTasks()}
          >
            {showUncompletedTasks ? (
              <>
                <XCircle size={20} weight="duotone" className="text-red-500" />
                SHOW UNCOMPLETED TASKS
              </>
            ) : (
              <>
                <CheckCircle
                  size={20}
                  weight="duotone"
                  className="text-green-500"
                />
                SHOW ALL TASKS
              </>
            )}
          </button>
        </section>
      </header>

      <ul className="mt-10">
        <h2 className="mb-5 text-zinc-500 text-xs font-medium tracking-widest">
          TAREFAS
        </h2>

        {tasks.data.map((item) => {
          return (
            <li
              key={item.title}
              className={clsx(
                'flex items-center gap-x-4 mb-4 transition-opacity duration-200',
                {
                  'opacity-30': showUncompletedTasks && item.completed,
                },
              )}
            >
              <button
                onClick={() => handleChangeTask(item)}
                className="flex items-center justify-center h-5 w-5 border disabled:cursor-not-allowed"
                disabled={showUncompletedTasks && item.completed}
              >
                <Check
                  className={clsx({
                    'text-green-500': item.completed,
                    invisible: !item.completed,
                  })}
                  size={14}
                  weight="bold"
                />
              </button>

              <p className="text-xs text-zinc-700 uppercase font-medium">
                {item.title}
              </p>
            </li>
          )
        })}
      </ul>

      <LessonItemForm />
    </aside>
  )
}
