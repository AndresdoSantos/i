import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { makeSlug } from '../utils/makeSlug'

import { CourseContext } from '../contexts/Course.context'
import { LessonItemFormContext } from '../contexts/LessonItemForm.context'

import type { Todo, TodoList } from '../@types'

const createLessonSchema = z.object({
  title: z.string().max(100, 'Deve ter no máximo 100 letras.'),
})

type CreateLessonInput = z.input<typeof createLessonSchema>

export function LessonItemForm() {
  const { course } = useContext(CourseContext)
  const { setTasks } = useContext(LessonItemFormContext)

  const slug = makeSlug(course?.title || '')

  const { handleSubmit, register, reset } = useForm<CreateLessonInput>({
    resolver: zodResolver(createLessonSchema),
  })

  const onSubmit = useCallback(
    (input: CreateLessonInput) => {
      const prevItems = localStorage.getItem(`@i:${slug}`)

      const data: Todo = {
        completed: false,
        ...input,
      }

      if (!prevItems) {
        const newData: TodoList = {
          path: slug,
          data: [data],
        }

        setTasks({
          path: slug,
          data: [data],
        })

        localStorage.setItem(`@i:${slug}`, JSON.stringify(newData))
      } else {
        const parsedPrevItems = JSON.parse(prevItems) as TodoList

        const dataWithSameSlug = parsedPrevItems.path === slug

        if (dataWithSameSlug) {
          const newData: TodoList = {
            path: parsedPrevItems!.path,
            data: [...parsedPrevItems!.data, data],
          }

          setTasks({
            path: parsedPrevItems!.path,
            data: [...parsedPrevItems!.data, data],
          })

          localStorage.setItem(`@i:${slug}`, JSON.stringify(newData))
        }
      }

      reset()
    },
    [reset, setTasks, slug],
  )

  return (
    <form
      className="absolute bottom-0 right-0 left-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="border-t w-full h-12 outline-none text-[11px] font-medium text-zinc-700 uppercase px-4"
        placeholder="What will you do?"
        {...register('title')}
      />
    </form>
  )
}
