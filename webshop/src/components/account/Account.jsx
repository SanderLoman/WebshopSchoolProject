import React, { useState, useEffect, useRef, useContext } from "react"
import Navbar from "../homepage/navbar/Navbar.jsx"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import ThemeContext from "../providers/ThemeProvider.jsx"
import { initFlowbite } from "flowbite"
import Cart from "../cart/Cart.jsx"
import useAuth from "../auth/useAuth.jsx"

const Account = () => {
    const {
        lightTheme,
        systemTheme,
        setLightMode,
        setDarkMode,
        setSystemMode,
    } = useContext(ThemeContext)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = ""
        }
    }, [showModal])

    const navigateHome = () => {
        navigate("/")
    }

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
        console.log("initFlowbite")
        initFlowbite()
    }, [])

    return (
        <>
            <nav className="bg-gray-200 dark:bg-gray-900">
                <div className="absolute top-4 left-4">
                    <button
                        type="button"
                        onClick={navigateHome}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="#"
                        className="flex items-center w-1/2 md:w-1/3 select-none self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >
                        Webshop
                    </a>
                    <div className="hidden md:block w-1/2 md:w-1/3">
                        <div className="dark:border-gray-700">
                            <ul
                                className="flex flex-wrap justify-around -mb-px text-sm font-medium text-center"
                                id="default-tab"
                                data-tabs-toggle="#default-tab-content"
                                role="tablist"
                            >
                                <li
                                    className="me-2 text-lg"
                                    role="presentation"
                                >
                                    <button
                                        className="inline-block border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                        id="profile-tab"
                                        data-tabs-target="#profile"
                                        type="button"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected="false"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li
                                    className="me-2 text-lg"
                                    role="presentation"
                                >
                                    <button
                                        className="inline-block border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                        id="dashboard-tab"
                                        data-tabs-target="#dashboard"
                                        type="button"
                                        role="tab"
                                        aria-controls="dashboard"
                                        aria-selected="false"
                                    >
                                        Orders
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-1/2 md:w-1/3 flex justify-end">
                        <div
                            className="relative w-10 h-10 overflow-hidden cursor-pointer bg-white rounded-full dark:bg-gray-600 border border-gray-400"
                            id="avatarButton"
                            type="button"
                            data-dropdown-toggle="userDropdown"
                            data-dropdown-placement="bottom-start"
                            src="/docs/images/people/profile-picture-5.jpg"
                            alt="User dropdown"
                        >
                            {/* Account Icon */}
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
                        </div>

                        {/* <!-- Dropdown menu --> */}
                        <div
                            id="userDropdown"
                            className="z-10 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
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
                                className="py-2 text-sm text-gray-700 dark:text-zinc-200"
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
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
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
                                                            systemTheme ===
                                                            "system"
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
                                                            lightTheme ===
                                                            "light"
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
                                                            systemTheme ===
                                                            "dark"
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
                <Cart showModal={showModal} setShowModal={setShowModal}>
                    {/* Modal Content Here */}
                </Cart>
            </nav>

            <div className="h-screen w-screen bg-gray-200 dark:bg-gray-900">
                <div id="default-tab-content">
                    <div
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong className="font-medium text-gray-800 dark:text-white">
                                Profile tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of
                            this one for the next. The tab JavaScript swaps
                            classes to control the content visibility and
                            styling.
                        </p>
                    </div>
                    <div
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="dashboard"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong className="font-medium text-gray-800 dark:text-white">
                                Dashboard tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of
                            this one for the next. The tab JavaScript swaps
                            classes to control the content visibility and
                            styling.
                        </p>
                    </div>
                    <div
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong className="font-medium text-gray-800 dark:text-white">
                                Settings tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of
                            this one for the next. The tab JavaScript swaps
                            classes to control the content visibility and
                            styling.
                        </p>
                    </div>
                    <div
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="contacts"
                        role="tabpanel"
                        aria-labelledby="contacts-tab"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong className="font-medium text-gray-800 dark:text-white">
                                Contacts tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of
                            this one for the next. The tab JavaScript swaps
                            classes to control the content visibility and
                            styling.
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer className={"select-none"} />
        </>
    )
}

export default Account
