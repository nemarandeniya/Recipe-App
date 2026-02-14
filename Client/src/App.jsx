import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './Views/Home'
import Signup from './Views/Signup'
import Login from './Views/Login'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './Context/ThemeContext'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Views/Navbar'
import { useTheme } from './Context/ThemeContext'

const AppContent = () => {

  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode
      ? "bg-gray-950 text-white"
      : "bg-gray-50 text-gray-900"
      }`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App