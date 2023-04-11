import { useContext } from 'react'
import { Books, CurrencyDollar, Ear } from '@phosphor-icons/react'

import { ModuleContext } from '../contexts/Module.context'

export function Menu() {
  const { setModule } = useContext(ModuleContext)

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
        <li className="flex items-center transition-transform duration-150 hover:translate-x-4">
          <CurrencyDollar size={22} weight="duotone" className="mr-4" />

          <button onClick={() => setModule('money')}>
            <span className="text-sm text-zinc-700">My money</span>
          </button>
        </li>

        <li className="flex items-center transition-transform duration-150 hover:translate-x-4">
          <Ear size={22} weight="duotone" className="mr-4" />

          <button onClick={() => setModule('triggers')}>
            <span className="text-sm text-zinc-700">My triggers</span>
          </button>
        </li>

        <li className="flex items-center transition-transform duration-150 hover:translate-x-4">
          <Books size={22} weight="duotone" className="mr-4" />

          <button onClick={() => setModule('studies')}>
            <span className="text-sm text-zinc-700">My library</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
