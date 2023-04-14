import { MagnifyingGlass, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

// import { ModuleContext } from '../contexts/Module.context'

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

  // const { module } = useContext(ModuleContext)
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

  return (
    <div
      className={clsx(
        'transition-transform duration-700 absolute inset-0 w-screen h-screen bg-white',
        /** {
          'translate-x-[calc(100vw_-_100vw)]': module === 'triggers',
          '-translate-x-[100vw]': module === null || module !== 'triggers',
        }, */
      )}
    >
      <div className="mx-auto max-w-5xl pt-20 px-5">
        <header className="flex items-center justify-between">
          <section>
            <h1 className="sm:font-light text-zinc-700 text-lg sm:text-2xl -tracking-wider">
              My triggers
            </h1>
            <span className="text-[10px] sm:text-xs text-zinc-500">
              What makes me want the wrong things.
            </span>
          </section>

          <button
            onClick={() => handleChangeIsSearching()}
            className={clsx(
              'flex items-center gap-x-2 h-8 sm:pl-2 sm:pr-3 sm:mr-4 rounded-full text-xs font-medium transition-[:hover] duration-200',
              {
                'text-zinc-500 hover:text-zinc-700': !isSearching,
                'text-red-500 hover:text-red-700': isSearching,
              },
            )}
          >
            {isSearching ? (
              <div className="flex items-center sm:after:content-['CANCEL_SEARCH']">
                <X weight="bold" size={18} className="sm:mr-2" />
              </div>
            ) : (
              <div className="flex items-center sm:after:content-['SEARCH']">
                <MagnifyingGlass
                  weight="duotone"
                  size={18}
                  className="sm:mr-2"
                />
              </div>
            )}
          </button>
        </header>

        <form className="flex my-10" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={clsx(
              'flex items-center justify-center py-1 bg-zinc-100 text-[10px] sm:text-xs rounded-md transition-[width] duration-300',
              {
                'w-0': !isSearching,
                'w-44 mr-2': isSearching,
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
            className="w-full text-xs sm:text-sm -tracking-wide text-zinc-700 py-2 outline-none"
            placeholder={
              isSearching ? 'Remember of...' : 'What did you see or feel?'
            }
            {...register('title')}
          />

          <input type="submit" className="hidden" />
        </form>

        <ul className="flex flex-col-reverse">
          {triggers?.map((item) => (
            <li key={item.createdAt} className="flex items-center my-2">
              <time className="flex items-center justify-start text-[10px] sm:text-xs text-zinc-500 font-medium mr-5 min-w-[3rem] w-12 max-w-[3rem]">
                {dayjs(item.createdAt).format('HH:mm')}
              </time>

              <span className="text-xs sm:text-sm text-zinc-700 -tracking-wide">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
