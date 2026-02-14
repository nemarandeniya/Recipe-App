import React from 'react'
import Navbar from './Navbar'
import { useTheme } from '../Context/ThemeContext'

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()

    return (
        <div>
            {/* <Navbar /> */}
            <div className={`min-h-screen transition-all duration-500 pt-24${isDarkMode
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}>
                <h1 className="text-3xl">Home Page</h1>

            </div>
        </div>
    )
}

export default Home