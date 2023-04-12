import { Dispatch, createContext } from 'react'

import type { TodoList } from '../@types'

type Props = {
  tasks: TodoList
  setTasks: Dispatch<TodoList>
}

export const LessonItemFormContext = createContext({} as Props)
