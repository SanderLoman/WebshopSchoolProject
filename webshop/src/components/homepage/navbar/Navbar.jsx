import React, { useState, useEffect, useRef } from "react"
import useAuth from "../../auth/useAuth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Navbar.css"

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme ? savedTheme : "light"
    })

    const [themeSettingMode, setThemeSettingMode] = useState(() => {
        const savedMode = localStorage.getItem("themeSettingMode")
        return savedMode ? savedMode : "system"
    })

    useEffect(() => {
        const root = document.documentElement
        root.className = theme

        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem("themeSettingMode", themeSettingMode)

        if (themeSettingMode === "system") {
            const prefersDarkScheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            )
            setTheme(prefersDarkScheme.matches ? "dark" : "light")
        }
    }, [themeSettingMode])

    const setLightMode = () => {
        setTheme("light")
        setThemeSettingMode("light")
    }

    const setDarkMode = () => {
        setTheme("dark")
        setThemeSettingMode("dark")
    }

    const setSystemMode = () => {
        setThemeSettingMode("system")
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    const navigateToAdmin = () => {
        navigate("/admin")
    }

    return (
        <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" class="flex items-center md:w-auto">
                    <span class="select-none self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Webshop
                    </span>
                </a>
                <div class="hidden md:block md:w-auto">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                class="select-none block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="select-none block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="select-none block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="select-none block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="md:w-auto flex justify-end">
                    <div
                        class="relative w-10 h-10 overflow-hidden cursor-pointer bg-gray-100 rounded-full dark:bg-gray-600"
                        id="avatarButton"
                        type="button"
                        data-dropdown-toggle="userDropdown"
                        data-dropdown-placement="bottom-start"
                        src="/docs/images/people/profile-picture-5.jpg"
                        alt="User dropdown"
                    >
                        {/* Account Icon */}
                        <svg
                            class="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>

                    {/* <!-- Dropdown menu --> */}
                    <div
                        id="userDropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        {user && (
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{`${user.firstName} ${user.lastName}`}</div>
                                <div className="font-medium truncate">
                                    {user.email}
                                </div>
                            </div>
                        )}

                        <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="avatarButton"
                        >
                            {user && (
                                <>
                                    <li>
                                        <a
                                            href="#"
                                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Account
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Shopping cart
                                        </a>
                                    </li>
                                </>
                            )}

                            <li>
                                <li aria-labelledby="dropdownNavbarLink">
                                    <button
                                        id="doubleDropdownButton"
                                        data-dropdown-toggle="doubleDropdown"
                                        data-dropdown-placement="right-start"
                                        type="button"
                                        class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Themes
                                        <svg
                                            class="w-2.5 h-2.5 ml-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="doubleDropdown"
                                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                    >
                                        <ul
                                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="doubleDropdownButton"
                                        >
                                            <li>
                                                <button
                                                    id="system"
                                                    className={`block text-left px-4 py-2 w-full ${
                                                        themeSettingMode ===
                                                        "system"
                                                            ? "bg-gray-200 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setSystemMode}
                                                >
                                                    System
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    id="light"
                                                    class={`block text-left px-4 py-2 w-full ${
                                                        themeSettingMode ===
                                                        "light"
                                                            ? "bg-gray-200 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setLightMode}
                                                >
                                                    Light
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    id="dark"
                                                    class={`block text-left px-4 py-2 w-full ${
                                                        themeSettingMode ===
                                                        "dark"
                                                            ? "bg-gray-200 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setDarkMode}
                                                >
                                                    Dark
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </li>
                        </ul>
                        <div class="py-1">
                            {/* check whether a person is logged in or not if not show sign in if logged in show sign out */}

                            {user ? (
                                <button
                                    onClick={logout}
                                    class="block w-full text-left rounded-b-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </button>
                            ) : (
                                <button
                                    onClick={navigateToLogin}
                                    class="block w-full text-left rounded-b-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </nav>
    )
}

export default Navbar
