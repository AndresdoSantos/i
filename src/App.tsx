import { Triggers } from './components/Triggers'

// import { Module, ModuleContext } from './contexts/Module.context'

export function App() {
  // const [module, setModule] = useState<Module | null>('studies')

  return (
    <>
      <Triggers />
      {/** <ModuleContext.Provider value={{ module, setModule }}>
       <Menu /> 

      <div className="relative h-screen overflow-hidden">
        <Studies />

        

        <Money />
      </div>
    </ModuleContext.Provider> */}
    </>
  )
}
