import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../providers/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ThemeContext from "../../providers/ThemeProvider.jsx"
import { initFlowbite } from "flowbite"
import Cart from "../../cart/Cart.jsx"
import "./Navbar.css"

const Navbar = () => {
    const {
        lightTheme,
        systemTheme,
        setLightMode,
        setDarkMode,
        setSystemMode,
    } = useContext(ThemeContext)
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [showCart, setshowCart] = useState(false)

    useEffect(() => {
        if (showCart) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = ""
        }
    }, [showCart])

    const navigateToLogin = () => {
        navigate("/login")
    }

    const navigateToAdmin = () => {
        navigate("/admin")
    }

    const navigateToAccount = () => {
        navigate("/account")
    }

    useEffect(() => {
        initFlowbite()
    }, [])

    return (
        <nav className="bg-neutral-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <p className="flex items-center w-1/2 md:w-1/3 select-none self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Webshop
                </p>
                <div className="hidden md:block w-1/2 md:w-1/3">
                    <ul className="flex justify-center flex-col font-medium p-4 md:p-0 mt-4 mx-auto border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#shop"
                                className="select-none block pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Shop
                            </a>
                        </li>
                        <li>
                            <a
                                href="#testimonials"
                                className="select-none block pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Testimonials
                            </a>
                        </li>

                        <li>
                            <a
                                href="#faq"
                                className="select-none block pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="w-1/2 md:w-1/3 flex justify-end">
                    <div
                        className="relative w-10 h-10 overflow-hidden cursor-pointer bg-white rounded-full dark:bg-gray-600 shadow-md active:shadow-sm"
                        id="avatarButton"
                        type="button"
                        data-dropdown-toggle="userDropdown"
                        data-dropdown-placement="bottom-start"
                        alt="User dropdown"
                    >
                        {user && user.pfp ? (
                            <img
                                src={user.pfp}
                                alt="User"
                                className="w-full h-full rounded-full"
                            />
                        ) : (
                            <svg
                                className="absolute w-12 h-12 text-gray-400 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        )}
                    </div>

                    {/* <!-- Dropdown menu --> */}
                    <div
                        id="userDropdown"
                        className="z-10 hidden bg-white divide-y divide-gray-100 shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 select-none"
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
                            className="text-sm text-gray-700 dark:text-zinc-200"
                            aria-labelledby="avatarButton"
                        >
                            {user && (
                                <>
                                    {user.role === "admin" && (
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={navigateToAdmin}
                                            >
                                                Admin
                                            </button>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={navigateToAccount}
                                        >
                                            Account
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => setshowCart(true)}
                                        >
                                            Cart
                                        </button>
                                    </li>
                                </>
                            )}

                            <li>
                                <div aria-labelledby="dropdownNavbarLink">
                                    <button
                                        id="doubleDropdownButton"
                                        data-dropdown-toggle="doubleDropdown"
                                        data-dropdown-placement="right-start"
                                        type="button"
                                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Themes
                                        <svg
                                            className="w-2.5 h-2.5 ml-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="doubleDropdown"
                                        className="z-10 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
                                    >
                                        <ul
                                            className=" text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="doubleDropdownButton"
                                        >
                                            <li>
                                                <button
                                                    id="system"
                                                    className={`block text-left px-4 py-2 w-full ${
                                                        systemTheme === "system"
                                                            ? "bg-zinc-300 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setSystemMode}
                                                >
                                                    System
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    id="light"
                                                    className={`block text-left px-4 py-2 w-full ${
                                                        lightTheme === "light"
                                                            ? "bg-zinc-300 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setLightMode}
                                                >
                                                    Light
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    id="dark"
                                                    className={`block text-left px-4 py-2 w-full ${
                                                        systemTheme === "dark"
                                                            ? "bg-zinc-300 dark:bg-gray-600"
                                                            : ""
                                                    } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                    onClick={setDarkMode}
                                                >
                                                    Dark
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="">
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </button>
                            ) : (
                                <button
                                    onClick={navigateToLogin}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Cart showCart={showCart} setshowCart={setshowCart} />

            <ToastContainer className={"select-none"} />
        </nav>
    )
}

export default Navbar
