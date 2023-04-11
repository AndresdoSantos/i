import { Dispatch, createContext } from 'react'

export type Module = 'triggers' | 'money' | 'studies'

type Props = {
  module: Module | null
  setModule: Dispatch<Module | null>
}

export const ModuleContext = createContext({} as Props)
