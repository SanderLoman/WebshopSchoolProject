import React, { useState } from "react"
import useAuth from "../auth/useAuth.jsx"
import { useNavigate } from "react-router-dom"
import arrowLeft from "../../assests/left-arrow.svg"
import "./Login.css"

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()

    const { register } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleRegister = () => {
        if (isValidEmail(email) && password === confirmPassword) {
            setEmailError("")
            register(email, password, firstName, lastName, "customer")
            // Code to push user data to JSON file should be handled in register function
            navigate("/login")
        } else {
            setEmailError("Please enter a valid email address")
            setPasswordError("Passwords do not match")
        }
    }

    const navigateLogin = () => {
        navigate("/login")
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="absolute top-4 left-4">
                <button
                    onClick={navigateLogin}
                    className="rounded-full p-2 h-10 w-10 bg-transparent border-2 border-gray-200 flex justify-center items-center hover:shadow-sm active:shadow-md transition-shadow duration-300 ease-in-out"
                >
                    <img src={arrowLeft} alt="Home" className="" />
                </button>
            </div>
            <div className="login-container bg-white p-8 rounded-md shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 my-2 border rounded outline-none focus:ring-0 focus:shadow-md transition-shadow duration-300 ease-in-out"
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 my-2 border rounded outline-none focus:ring-0 focus:shadow-md transition-shadow duration-300 ease-in-out"
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 my-2 border rounded outline-none focus:ring-0 focus:shadow-md transition-shadow duration-300 ease-in-out"
                />

                {emailError && <p className="text-red-500">{passwordError}</p>}

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white p-3 my-2 rounded hover:bg-blue-700 active:ring-0 active:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default RegisterPage
