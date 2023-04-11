import { useState } from 'react'

import { Triggers } from './components/Triggers'
import { Menu } from './components/Menu'
import { Money } from './components/Money'
import { Studies } from './components/Studies'

import { Module, ModuleContext } from './contexts/Module.context'

export function App() {
  const [module, setModule] = useState<Module | null>('studies')

  return (
    <ModuleContext.Provider value={{ module, setModule }}>
      <Menu />

      <div className="relative h-screen overflow-hidden">
        <Studies />

        <Triggers />

        <Money />
      </div>
    </ModuleContext.Provider>
  )
}
