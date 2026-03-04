import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useTheme } from '../Context/ThemeContext'

const Login = () => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { isDarkMode, toggleDarkMode } = useTheme()

    const navigate = useNavigate()

    const [_, setCookies] = useCookies(["access_token"])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { username, password })
            console.log(response);
            if (response.data.success) {
                toast.success("Successfully Login!")
                navigate('/home')
                setCookies("access_token", response.data.token)
                window.localStorage.setItem("userID", response.data.userId)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={`flex justify-center items-center min-h-screen ${isDarkMode
            ? "bg-gray-950 text-white"
            : "bg-gray-50 text-gray-900"
            }`}>

            <div className={`p-14 rounded-2xl border ${isDarkMode
                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                }`}>
                <h2 className='text-3xl flex justify-center mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Username</label>
                        <input
                            type='text'
                            className={`w-full px-3 py-2  border ${isDarkMode
                                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                }`}
                            placeholder='Enter Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-10">
                        <label className='block text-gray-700 '>Password</label>
                        <input
                            type='password'
                            className={`w-full px-3 py-2 border ${isDarkMode
                                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                }`}
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='submit'
                            className={`p-2 w-full rounded-sm text-white bg-blue-500`}
                        >
                            Login
                        </motion.button>
                        <p className='text-center text-sm text-gray-500 mt-2'>
                            Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login