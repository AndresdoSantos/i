import clsx from 'clsx'
import { useCallback, useContext, useState } from 'react'
import { Calendar, X } from '@phosphor-icons/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { StudyingContext } from '../contexts/Studying.context'

import { localStorage } from '../utils/localStorage'

const createScheduleStudySchema = z.object({
  title: z.string().max(100, 'Deve ter no máximo 100 letras.'),
  url: z.string().max(255, 'Deve ter no máximo 255 letras.'),
})

type CreateScheduleInput = z.input<typeof createScheduleStudySchema>

export function ScheduleStudy() {
  const { isStudying } = useContext(StudyingContext)

  const { handleSubmit, register, reset } = useForm<CreateScheduleInput>({
    resolver: zodResolver(createScheduleStudySchema),
  })

  const onSubmit = useCallback(
    (input: CreateScheduleInput) => {
      localStorage.setItem<CreateScheduleInput>('studies', input)

      reset()
    },
    [reset],
  )

  const [scheduleStudy, setScheduleStudy] = useState(false)

  const handleScheduleStudy = useCallback(() => {
    setScheduleStudy((prevState) => !prevState)
  }, [])

  return (
    <>
      <button
        onClick={handleScheduleStudy}
        className={clsx(
          'flex items-center px-4 gap-x-2 text-sm h-10 w-44 rounded-lg text-zinc-700 transition-transform duration-500',
          {
            '-translate-y-40': isStudying,
            'translate-y-0': !isStudying,
          },
        )}
      >
        <Calendar weight="duotone" size={20} />
        Agendar estudo
      </button>

      <aside
        className={clsx(
          'absolute right-0 top-0 bottom-0 border-l transition-transform duration-700 w-[30rem] px-5 bg-white shadow-xl',
          {
            '-translate-x-[calc(30rem_-_30rem)] visible': scheduleStudy,
            'translate-x-[30rem] invisible': !scheduleStudy,
          },
        )}
      >
        <header className="flex items-center justify-between pt-20 mb-10">
          <section>
            <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
              O que estudar
            </h1>
            <span className="text-xs text-zinc-500">
              Uma matéria que você vai focar agora.
            </span>
          </section>

          <button onClick={handleScheduleStudy}>
            <X size={20} className="text-red-500" />
          </button>
        </header>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="input"
            placeholder="Nome para o agendamento"
            {...register('title')}
          />

          <input
            type="text"
            className="input"
            placeholder="Link para a aula"
            {...register('url')}
          />

          <button className="h-10 w-full text-xs text-white bg-zinc-900 mt-2">
            COMEÇAR A ESTUDAR
          </button>
        </form>
      </aside>
    </>
  )
}
