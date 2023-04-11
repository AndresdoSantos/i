import { PauseCircle, PlayCircle, StopCircle, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useCallback, useContext, useState } from 'react'

import { StudyingContext } from '../contexts/Studying.context'

export function StartStudy() {
  const { isStudying, setIsStudying } = useContext(StudyingContext)

  const [isPaused, setIsPaused] = useState(false)

  const handlePause = useCallback(() => {
    setIsPaused((prevState) => !prevState)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsStudying(true)}
        className="text-green-500 hover:text-green-600"
      >
        <PlayCircle size={22} weight="duotone" />
      </button>

      <aside
        className={clsx(
          'absolute right-0 left-0 bottom-0 border-t transition-transform duration-700 w-full px-5 bg-white',
          {
            '-translate-y-[calc(30rem_-_30rem)] h-[30rem]': isStudying,
            'translate-y-[30rem] h-[30rem]': !isStudying,
          },
        )}
      >
        <main className="w-[64rem] mx-auto py-20">
          <header className="flex items-center justify-between mb-10">
            <section>
              <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
                {isPaused ? 'Um tempo de descanso' : 'Mantenha o foco'}
              </h1>
              <span className="text-xs text-zinc-500">
                {isPaused
                  ? 'Tire um tempo para descansar e tomar um sol.'
                  : 'Preste atenção aos detalhes da matéria.'}
              </span>
            </section>

            <button
              className={clsx('transition-transform delay-200 duration-700', {
                'translate-y-96': isPaused,
                'translate-y-0': !isPaused,
              })}
              disabled={isPaused}
              onClick={() => setIsStudying(false)}
            >
              <X size={20} className="text-red-500" />
            </button>
          </header>

          <div className="border-r">
            <time className="text-5xl font-light text-zinc-600">1:00</time>

            <section className="flex items-center gap-4 mt-5">
              <button
                // onClick={() => setIsStudying(true)}
                className="text-red-500 flex items-center font-medium text-xs gap-x-2 pl-1 pr-3 py-1 rounded-full hover:bg-red-200/25"
              >
                <StopCircle size={22} weight="duotone" />
                PARAR
              </button>

              <button
                onClick={handlePause}
                className={clsx(
                  'flex items-center font-medium text-xs gap-x-2 pl-1 pr-3 py-1 rounded-full',
                  {
                    'hover:bg-yellow-200/25 text-yellow-500': !isPaused,
                    'hover:bg-green-200/25 text-green-500': isPaused,
                  },
                )}
              >
                {isPaused ? (
                  <>
                    <PlayCircle size={22} weight="duotone" />
                    RETOMAR
                  </>
                ) : (
                  <>
                    <PauseCircle size={22} weight="duotone" />
                    PAUSAR
                  </>
                )}
              </button>
            </section>
          </div>
        </main>
      </aside>
    </>
  )
}
