import { Dispatch, createContext } from 'react'

type Props = {
  isStudying: boolean
  setIsStudying: Dispatch<boolean>
}

export const StudyingContext = createContext({} as Props)
