import React, { useState } from "react"
import useAuth from "../auth/useAuth.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useDarkMode } from "../darkmode/DarkModeContext.jsx"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Login.css"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const navigate = useNavigate()

    const { login } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleLogin = () => {
        if (isValidEmail(email)) {
            // setEmailError("")
            const loginSuccess = login(email, password)
            if (loginSuccess) {
                navigate("/")
                setTimeout(() => {
                    toast.success("Successfully logged in!", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        newestOnTop: false,
                        closeOnClick: true,
                        rtl: false,
                        pauseOnFocusLoss: true,
                        draggable: true,
                        pauseOnHover: true,
                        // theme: isDarkMode ? "dark" : "light", !!! FIX THIS !!!
                    })
                }, 100)
            } else {
                toast.error("Invalid email or password", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    pauseOnHover: true,
                    // theme: isDarkMode ? "dark" : "light",
                })
                // setEmailError("Invalid email or password")
            }
        } else {
            toast.error("Please enter a valid email address", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                // theme: isDarkMode ? "dark" : "light", !!! FIX THIS !!!
            })
            // setEmailError("Please enter a valid email address")
        }
    }

    const navigateHome = () => {
        navigate("/")
    }

    const dummyToast = () => {
        toast.success("This is a dummy link :)", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            // theme: isDarkMode ? "dark" : "light", !!! FIX THIS !!!
        })
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="absolute top-4 left-4">
                <button
                    onClick={navigateHome}
                    className="rounded-full p-2 h-10 w-10 bg-transparent border bg-white border-gray-200 flex justify-center items-center hover:shadow-sm active:shadow-md transition-shadow duration-300 ease-in-out"
                >
                    <div className="text-2xl">←</div>
                </button>
            </div>
            <div className="login-container p-8 rounded-md">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 my-2 rounded outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 my-2 rounded outline-none"
                />

                <button
                    onClick={handleLogin}
                    className="ring-2 border-blue-700 bg-blue-700 active:ring-0 transition-all duration-75 ease-in-out w-full text-white p-3 my-2 rounded hover:bg-blue-700 active:shadow-lg"
                >
                    Login
                </button>

                <div className="mt-4 w-full flex justify-between items-center">
                    <button onClick={dummyToast} className="text-blue-500">
                        Forgot Password?
                    </button>
                    <div className="border-l border-gray-500 h-4 mx-2"></div>
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage
