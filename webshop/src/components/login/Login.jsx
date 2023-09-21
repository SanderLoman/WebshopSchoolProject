import React, { useState, useEffect } from "react"
import useAuth from "../auth/useAuth.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useDarkMode } from "../darkmode/DarkModeContext.jsx"
import "./Login.css"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isDarkMode, setIsDarkMode } = useDarkMode()
    const [emailError, setEmailError] = useState("")
    const navigate = useNavigate()

    const { login } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleLogin = () => {
        if (isValidEmail(email)) {
            setEmailError("")
            const loginSuccess = login(email, password)
            if (loginSuccess) {
                navigate("/")
            } else {
                setEmailError("Invalid email or password")
            }
        } else {
            setEmailError("Please enter a valid email address")
        }
    }

    const navigateHome = () => {
        navigate("/")
    }

    return (
        <div
            className={`${
                isDarkMode
                    ? "dark:bg-[#1d242c] text-white"
                    : "bg-white text-black"
            } h-screen flex justify-center items-center`}
        >
            <div className="absolute top-4 left-4">
                <button
                    onClick={navigateHome}
                    className={`${
                        isDarkMode ? "dark:bg-[#1d242c]" : "bg-white"
                    } rounded-full p-2 h-10 w-10 bg-transparent border bg-white border-gray-200 flex justify-center items-center hover:shadow-sm active:shadow-md transition-shadow duration-300 ease-in-out`}
                >
                    <div
                        className={`${
                            isDarkMode ? "text-white" : "text-black"
                        } text-2xl`}
                    >
                        ←
                    </div>
                </button>
            </div>
            <div
                className={`${
                    isDarkMode
                        ? "dark:bg-[#1d242c] text-white drop-shadow-2xl shadow-2xl shadow-gray-900"
                        : "bg-white text-black drop-shadow-2xl shadow-2xl"
                } login-container p-8 rounded-md`}
            >
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${
                        isDarkMode
                            ? "dark:bg-[#1d242c] dark:text-white"
                            : "text-black"
                    } w-full p-3 my-2 rounded outline-none drop-shadow-xl shadow-gray-900`}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${
                        isDarkMode
                            ? "dark:bg-[#1d242c] dark:text-white"
                            : "text-black"
                    } w-full p-3 my-2 rounded outline-none drop-shadow-xl shadow-gray-900`}
                />

                <button
                    onClick={handleLogin}
                    className="ring-2 border-blue-700 bg-blue-700 active:ring-0 transition-all duration-75 ease-in-out w-full text-white p-3 my-2 rounded hover:bg-blue-700 active:shadow-lg"
                >
                    Login
                </button>

                <div className="mt-4 w-full flex justify-between items-center">
                    <div>
                        <a href="#" className="text-blue-500">
                            Forgot Password?
                        </a>
                    </div>
                    <div className="border-l border-gray-500 h-4 mx-2"></div>
                    <div>
                        <Link to="/register" className="text-blue-500">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
