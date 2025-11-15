import { useState } from 'react'
import { Button } from './components/ui/button'


import { AccordionDemo } from './components/AccordionDemo'
import { LoginForm } from './components/login-form'
import DoctorCard from './components/Doctor-card-component'


function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    
    </>
  )
}

export default App
