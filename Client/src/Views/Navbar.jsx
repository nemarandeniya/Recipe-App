import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../Context/ThemeContext'
import { GiKnifeFork } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdLogout, MdOutlineFormatTextdirectionRToL } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Navbar = () => {

    const { isDarkMode, toggleDarkMode } = useTheme()
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userId")
        console.log("logout");

        navigate("/login")
    }
    return (
        <motion.nav style={{ opacity: 1 }} className={`fixed top-0 w-full z-50 px-6 py-6 ${isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                <div className="flex">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className='text-blue-500'
                    >
                        <GiKnifeFork size={30} />{""}
                    </motion.div>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: "easeOut" }} >
                        <span className={`text-xl ml-3 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>GustoHub</span></motion.div>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {cookies.access_token ? (
                        <>
                            {["Home", "Create-Recipe", "Save-Recipe"].map((item) => (
                                <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                                    <motion.button
                                        key={item}
                                        whileHover={{ y: -2 }}
                                        className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                                    >
                                        {item}
                                    </motion.button>
                                </Link>
                            ))}

                            <motion.button
                                onClick={logout}
                                whileHover={{ y: -2 }}
                                className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                            >Logout</motion.button>

                        </>
                    ) : (
                        ["Home", "Login", "Signup"].map((item) => (

                            <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                                <motion.button
                                    key={item}
                                    whileHover={{ y: -2 }}
                                    className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                                >
                                    {item}
                                </motion.button>
                            </Link>


                        ))
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar