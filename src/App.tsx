import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { NavBar } from './components/navbar'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
