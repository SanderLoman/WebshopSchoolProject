import React, { useState, useContext } from "react"
import { UserContext } from "../providers/UserContext.jsx"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import ThemeContext from "../providers/ThemeProvider.jsx"
import "react-toastify/dist/ReactToastify.css"

// LoginPage Component: Provides a user interface for login functionality.
const LoginPage = () => {
    // Context for system theme and user login.
    const { systemTheme } = useContext(ThemeContext)
    const { login } = useContext(UserContext)

    // State for managing form inputs.
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    // Function to validate email format.
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    // Function to handle login logic.
    const handleLogin = async () => {
        if (isValidEmail(email)) {
            const loginSuccess = await login(email, password)
            if (loginSuccess) {
                navigate("/")
                setTimeout(() => {
                    toast.success("Successfully logged in!", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        className:
                            systemTheme === "dark" || systemTheme === "system"
                                ? "bg-gray-800 text-white"
                                : "bg-gray-100 text-black",
                    })
                }, 1)
            } else {
                toast.error("Invalid email or password", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    className:
                        systemTheme === "dark" || systemTheme === "system"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-black",
                })
            }
        } else {
            toast.error("Please enter a valid email address", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                className:
                    systemTheme === "dark" || systemTheme === "system"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-black",
            })
        }
    }

    // Function to navigate back to the homepage.
    const navigateHome = () => {
        navigate("/")
    }

    return (
        <div className="bg-neutral-200 dark:bg-gray-900 h-screen flex justify-center items-center">
            <div className="absolute top-4 left-4">
                <button
                    type="button"
                    onClick={navigateHome}
                    className="text-white bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:ring-blue-800"
                >
                    <svg
                        className="w-4 h-4 transform rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                    <span className="sr-only">Go back</span>
                </button>
            </div>
            <div className="login-container p-8 rounded-md">
                <h1 className="text-black dark:text-white text-2xl font-semibold mb-4 text-center">
                    Login
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}
                >
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={email}
                            autoComplete="username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required=""
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() =>
                            toast.info(
                                "Dummy notification for 'Forgot Password?'",
                                {
                                    position: "bottom-right",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    className:
                                        systemTheme === "dark" ||
                                        systemTheme === "system"
                                            ? "bg-gray-800 text-white"
                                            : "bg-gray-100 text-black",
                                },
                            )
                        }
                        className="text-blue-500"
                    >
                        Forgot Password?
                    </button>
                    <span className="mx-2 text-gray-400"> | </span>
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </div>
                <ToastContainer className={"select-none"} />
            </div>
        </div>
    )
}

export default LoginPage
