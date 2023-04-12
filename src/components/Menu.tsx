import { useContext } from 'react'
import { Books, CurrencyDollar, Ear } from '@phosphor-icons/react'

import { ModuleContext } from '../contexts/Module.context'
import clsx from 'clsx'

export function Menu() {
  const { setModule, module } = useContext(ModuleContext)

  return (
    <nav className="absolute left-0 bottom-0 top-0 w-96 border-r py-20 px-10 z-10 bg-white">
      <header className="flex items-center justify-between">
        <section>
          <h1 className="font-light text-zinc-700 text-2xl -tracking-wider">
            Menu
          </h1>
          <span className="text-xs text-zinc-500">
            Some options on the website.
          </span>
        </section>
      </header>

      <ul className="flex flex-col mt-10 gap-y-4">
        <li className="flex items-center">
          <CurrencyDollar
            size={22}
            weight="duotone"
            className={clsx({
              'text-cyan-500': module === 'money',
            })}
          />

          <button
            className={clsx(
              'ml-4 px-3 transition-transform duration-100 hover:translate-x-4',
              {
                'bg-cyan-200': module === 'money',
              },
            )}
            onClick={() => setModule('money')}
          >
            <span className="text-xs text-zinc-700 font-medium">MY MONEY</span>
          </button>
        </li>

        <li className="flex items-center">
          <Ear
            size={22}
            weight="duotone"
            className={clsx({
              'text-green-500': module === 'triggers',
            })}
          />

          <button
            className={clsx(
              'ml-4 px-3 transition-transform duration-100 hover:translate-x-4',
              {
                'bg-green-200': module === 'triggers',
              },
            )}
            onClick={() => setModule('triggers')}
          >
            <span className="text-xs text-zinc-700 font-medium">
              MY TRIGGERS
            </span>
          </button>
        </li>

        <li className="flex items-center">
          <Books
            size={22}
            weight="duotone"
            className={clsx({
              'text-yellow-500': module === 'studies',
            })}
          />

          <button
            className={clsx(
              'ml-4 px-3 transition-transform duration-100 hover:translate-x-4',
              {
                'bg-yellow-200': module === 'studies',
              },
            )}
            onClick={() => setModule('studies')}
          >
            <span className="text-xs text-zinc-700 font-medium">
              MY STUDIES
            </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
