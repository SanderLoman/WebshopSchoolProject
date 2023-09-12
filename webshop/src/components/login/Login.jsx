import React, { useState } from "react"
import useAuth from "../auth/useAuth.jsx"
import "./Login.css"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const { login } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleLogin = () => {
        if (isValidEmail(email)) {
            setEmailError("")
            login(email, password)
        } else {
            setEmailError("Please enter a valid email address")
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="login-container bg-white p-8 rounded-md shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 my-2 border rounded outline-none focus:ring-0 focus:shadow-md transition-shadow duration-300 ease-in-out"
                />
                {emailError && <p className="text-red-500">{emailError}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 my-2 border rounded outline-none focus:ring-0 focus:shadow-md transition-shadow duration-300 ease-in-out"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white p-3 my-2 rounded hover:bg-blue-700 active:ring-0 active:shadow-lg transition-shadow duration-300 ease-in-out"
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
                        <a href="#" className="text-blue-500">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
