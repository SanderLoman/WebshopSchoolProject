import React, { useState } from "react"
import useAuth from "../auth/useAuth.jsx"
import "./Login.css"

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const { login } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleRegister = () => {
        if (isValidEmail(email)) {
            setEmailError("")
            if (password === retypePassword) {
                // Replace this with your actual registration logic
            } else {
                alert("Passwords do not match!")
            }
        } else {
            setEmailError("Please enter a valid email address")
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="login-container bg-white p-8 rounded-md shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                {emailError && <p className="text-red-500">{emailError}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />

                <button onClick={handleRegister} className="login-button">
                    Register
                </button>

                <div className="mt-4">
                    <a href="#" className="text-blue-500">
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
