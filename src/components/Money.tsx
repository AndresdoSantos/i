import clsx from 'clsx'
import { useContext } from 'react'
/** import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs' */

import { ModuleContext } from '../contexts/Module.context'

// import { localStorage } from '../utils/localStorage'

/** const createTriggerSchema = z.object({
  title: z.string().max(100, 'Must have a maximum of 100 letters.'),
})

type CreateTriggerInput = z.input<typeof createTriggerSchema>

type CreateTriggerData = CreateTriggerInput & {
  createdAt: string
} */

export function Money() {
  const { module } = useContext(ModuleContext)

  /** const INITIAL_DATA = useMemo(() => {
    const triggerDateFilter = dayjs(new Date()).format('MMM DD')

    const data = localStorage.getItem<CreateTriggerData>('triggers')

    const filteredData = data?.filter((item) =>
      item.createdAt.includes(triggerDateFilter),
    )

    return filteredData
  }, [])

  const { handleSubmit, register, reset, setFocus } =
    useForm<CreateTriggerInput>({
      resolver: zodResolver(createTriggerSchema),
    })

  const [isNewTransaction, setIsNewTransaction] = useState(false)
  const [triggers, setTriggers] = useState(INITIAL_DATA)

  const handleChangeIsSearching = useCallback(() => {
    setIsNewTransaction((prevState) => !prevState)
  }, [])

  const onSubmit = useCallback((input: CreateTriggerInput) => {
    console.log(input)
  }, [])

  const handleClosePage = useCallback(() => {
    setModule(null)
  }, [setModule]) */

  return (
    <div
      className={clsx(
        'transition-transform duration-700 absolute inset-0 w-screen h-screen bg-white',
        {
          'translate-x-[calc(100vw_-_100vw)] ': module === 'money',
          '-translate-x-[100vw]': module === null || module !== 'money',
        },
      )}
    >
      {/** <div className="mx-auto max-w-5xl pt-20">
        <header className="flex items-center justify-between">
          <section>
            <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
              My money
            </h1>
            <span className="text-xs text-zinc-500">
              Management of my money.
            </span>
          </section>

          <div className="flex items-center">
            <button
              onClick={() => handleChangeIsSearching()}
              className="flex items-center gap-x-2 h-8 pl-4 pr-5 mr-4 rounded-full text-[11px] font-medium bg-green-200/25 text-green-500 transition-[:hover] duration-200 hover:bg-green-200/50"
            >
              <TrendUp weight="duotone" size={18} className="text-green-500" />
              NEW TRANSACTION
            </button>

            <button onClick={() => handleClosePage()}>
              <X size={20} className="text-red-500" />
            </button>
          </div>
        </header>

        <div className="flex items-center gap-5 mt-10">
          <div className="bg-zinc-50 p-5 rounded-md">
            <span className="text-zinc-500 mb-4 block text-xs font-medium">
              GASTO NESSE MÊS
            </span>

            <p className="text-zinc-700">R$ 1.500,48</p>
          </div>

          <div className="bg-zinc-50 p-5 rounded-md">
            <span className="text-zinc-500 mb-4 block text-xs font-medium">
              GASTO MÊS PASSADO
            </span>

            <p className="text-zinc-700">R$ 1.500,48</p>
          </div>

          <div className="bg-zinc-50 p-5 rounded-md">
            <span className="text-zinc-500 mb-4 block text-xs font-medium">
              ENTRADA DESSE MÊS
            </span>

            <p className="text-zinc-700">R$ 2.358,23</p>
          </div>

          <div className="bg-zinc-50 p-5 rounded-md">
            <span className="text-zinc-500 mb-4 block text-xs font-medium">
              SOBRA DESSE MÊS
            </span>

            <p className="text-zinc-700">R$ 326,56</p>
          </div>
        </div>

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
            className="w-full text-sm -tracking-wide text-zinc-700 py-2 outline-none"
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

<aside
  className={clsx(
    'absolute right-0 top-0 bottom-0 transition-transform duration-700 w-[30rem] px-5 bg-white',
    {
      visible: module === 'money',
      invisible: module !== 'money',
      '-translate-x-[calc(30rem_-_30rem)] shadow-xl border-l':
        isNewTransaction,
      'translate-x-[30rem]': !isNewTransaction,
    },
  )}
></aside> */}
    </div>
  )
}
