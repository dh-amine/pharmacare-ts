import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'


import { AccordionDemo } from './components/AccordionDemo'
import { LoginForm } from './components/login-form'
import DoctorCard from './components/Doctor-card-component'
import { useNavigate } from 'react-router'


function App() {
  const navigate = useNavigate();
  useEffect(()=>{
navigate("/login")
  },[]);

  return (
    <>
    <h1>Home</h1>
    
    </>
  )
}

export default App
