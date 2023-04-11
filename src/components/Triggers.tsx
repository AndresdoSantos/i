import { MagnifyingGlass, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useCallback, useContext, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { ModuleContext } from '../contexts/Module.context'

import { localStorage } from '../utils/localStorage'

const createTriggerSchema = z.object({
  title: z.string().max(100, 'Must have a maximum of 100 letters.'),
})

type CreateTriggerInput = z.input<typeof createTriggerSchema>

type CreateTriggerData = CreateTriggerInput & {
  createdAt: string
}

export function Triggers() {
  const INITIAL_DATA = useMemo(() => {
    const triggerDateFilter = dayjs(new Date()).format('MMM DD')

    const data = localStorage.getItem<CreateTriggerData[]>('triggers')

    const filteredData = data?.filter((item) =>
      item.createdAt.includes(triggerDateFilter),
    )

    return filteredData
  }, [])

  const { module, setModule } = useContext(ModuleContext)
  const { handleSubmit, register, reset, setFocus } =
    useForm<CreateTriggerInput>({
      resolver: zodResolver(createTriggerSchema),
    })

  const [isSearching, setIsSearching] = useState(false)
  const [triggers, setTriggers] = useState(INITIAL_DATA)

  const handleChangeIsSearching = useCallback(() => {
    setIsSearching((prevState) => {
      if (!prevState) {
        setFocus('title')

        return true
      } else {
        reset()

        setTriggers(INITIAL_DATA)

        return false
      }
    })
  }, [INITIAL_DATA, reset, setFocus])

  const onSubmit = useCallback(
    (input: CreateTriggerInput) => {
      if (isSearching) {
        const date = input.title.toLowerCase()

        const data = localStorage.getItem<CreateTriggerData[]>('triggers')

        if (data) {
          setTriggers(() => {
            return data.filter((item) =>
              item.createdAt.toLowerCase().includes(date),
            )
          })
        }
      } else {
        const date = new Date()

        const newTrigger: CreateTriggerData = {
          title: input.title,
          createdAt: `${date}`,
        }

        localStorage.setItem<CreateTriggerData>('triggers', newTrigger)

        setTriggers((prevState) =>
          prevState ? [...prevState, newTrigger] : [newTrigger],
        )

        reset()
      }
    },
    [isSearching, reset],
  )

  const handleClosePage = useCallback(() => {
    setModule(null)

    setIsSearching(false)
  }, [setModule])

  return (
    <div
      className={clsx(
        'transition-transform duration-700 absolute inset-0 w-screen h-screen bg-white',
        {
          'translate-x-[calc(100vw_-_100vw)]': module === 'triggers',
          '-translate-x-[100vw]': module === null || module !== 'triggers',
        },
      )}
    >
      <div className="mx-auto max-w-5xl pt-20">
        <header className="flex items-center justify-between">
          <section>
            <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
              My triggers
            </h1>
            <span className="text-xs text-zinc-500">
              What makes me want the wrong things.
            </span>
          </section>

          <div className="flex items-center">
            <button
              onClick={() => handleChangeIsSearching()}
              className="flex items-center gap-x-2 h-8 pl-2 pr-3 mr-4 rounded-full text-[11px] font-medium bg-zinc-100/25 text-zinc-500 border border-zinc-50 hover:border-zinc-400 transition-[:hover] duration-200"
            >
              <MagnifyingGlass weight="duotone" size={18} />
              SEARCH
            </button>

            <button onClick={() => handleClosePage()}>
              <X size={20} className="text-red-500" />
            </button>
          </div>
        </header>

        <form className="flex my-10" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={clsx(
              'flex items-center justify-center py-1 bg-zinc-100 text-xs rounded-md mr-2 transition-[width] duration-300',
              {
                'w-0': !isSearching,
                'w-44': isSearching,
              },
            )}
          >
            <span
              className={clsx('truncate', {
                flex: isSearching,
                hidden: !isSearching,
              })}
            >
              Place your date here
            </span>
          </div>

          <input
            type="text"
            className={clsx(
              'w-full text-sm -tracking-wide text-zinc-700 py-2 outline-none',
              {},
            )}
            placeholder={
              isSearching ? 'Remember to...' : 'What did you see or feel?'
            }
            {...register('title')}
          />

          <input type="submit" className="hidden" />
        </form>

        <ul className="flex flex-col-reverse">
          {triggers?.map((item) => (
            <li key={item.createdAt} className="flex items-center my-2">
              <time className="flex items-center justify-center text-xs text-zinc-500 font-medium mr-5 min-w-[3rem] w-12 max-w-[3rem]">
                {dayjs(item.createdAt).format('HH:mm')}
              </time>

              <span className="text-sm text-zinc-700 -tracking-wide">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
