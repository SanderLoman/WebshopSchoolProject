import React, { useState } from "react"
import useAuth from "../auth/useAuth.jsx"
import { useDarkMode } from "../darkmode/DarkModeContext.jsx"
import { useNavigate } from "react-router-dom"
import "./Login.css"

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const { isDarkMode, setIsDarkMode } = useDarkMode()
    const [lastName, setLastName] = useState("")
    const [registrationError, setRegistrationError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()

    const { register } = useAuth()

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleRegister = async () => {
        if (isValidEmail(email) && password === confirmPassword) {
            setEmailError("")
            setPasswordError("")
            const response = await register(
                email,
                password,
                firstName,
                lastName,
                "customer",
            )
            if (response === false) {
                setRegistrationError("Email already exists")
            } else if (response === true) {
                navigate("/login")
            } else {
                setRegistrationError("An error occurred")
            }
        } else {
            setEmailError("Please enter a valid email address")
            setPasswordError("Passwords do not match")
        }
    }

    const navigateLogin = () => {
        navigate("/login")
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
                    onClick={navigateLogin}
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
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`${
                        isDarkMode
                            ? "dark:bg-[#1d242c] dark:text-white"
                            : "text-black"
                    } w-full p-3 my-2 rounded outline-none drop-shadow-xl shadow-gray-900`}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`${
                        isDarkMode
                            ? "dark:bg-[#1d242c] dark:text-white"
                            : "text-black"
                    } w-full p-3 my-2 rounded outline-none drop-shadow-xl shadow-gray-900`}
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${
                        isDarkMode
                            ? "dark:bg-[#1d242c] dark:text-white"
                            : "text-black"
                    } w-full p-3 my-2 rounded outline-none drop-shadow-xl shadow-gray-900`}
                />

                {emailError && <p className="text-red-500">{passwordError}</p>}

                <button
                    onClick={handleRegister}
                    className="ring-2 border-blue-700 bg-blue-700 active:ring-0 transition-all duration-75 ease-in-out w-full text-white p-3 my-2 rounded hover:bg-blue-700 active:shadow-lg"
                >
                    Register
                </button>

                {registrationError && (
                    <p className="text-red-500">{registrationError}</p>
                )}
            </div>
        </div>
    )
}

export default RegisterPage
