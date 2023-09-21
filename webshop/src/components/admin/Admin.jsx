import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../darkmode/DarkModeContext.jsx"
import useAuth from "../../components/auth/useAuth.jsx"
import "./Admin.css"

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownWidth, setDropdownWidth] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [currentView, setCurrentView] = useState("orders")
    const { isDarkMode, setIsDarkMode } = useDarkMode()
    const { user, logout } = useAuth()
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const parentRef = useRef(null)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    // Effect to initialize isDarkMode from localStorage
    useEffect(() => {
        const localData = localStorage.getItem("isDarkMode")
        console.log("localData:", localData)
        if (localData !== null) {
            setIsDarkMode(JSON.parse(localData))
        }
    }, [])

    useEffect(() => {
        fetch("http://localhost:4500/api/orders")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data)
                } else {
                    console.error("Invalid API response:", data)
                }
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err)
            })
    }, [])

    useEffect(() => {
        console.log("User state has changed:", user)

        if (user && user.role !== "admin") {
            navigate("/login")
        }
    }, [user, navigate])

    useEffect(() => {
        if (isOpen && parentRef.current) {
            setDropdownWidth(parentRef.current.offsetWidth + 19)
        }
    }, [isOpen])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    const navigateToHome = () => {
        navigate("/")
    }

    const switchView = (view) => {
        setCurrentView(view)
    }

    const menuItems = (
        <ul className="cursor-pointer">
            <li className="border-b p-2 hover:bg-slate-100 active:bg-slate-200 select-none cursor-pointer text-start">
                <div onClick={navigateToHome}>Home</div>
            </li>
        </ul>
    )

    return (
        <div className="z-0 h-screen w-screen bg-white text-black dark:text-white dark:bg-black">
            <nav className="z-10 absolute w-full text-xl border-b-2 border-black font-medium bg-white text-black">
                <div className="flex justify-between items-center p-2">
                    <div className="w-1/2 md:w-1/3">
                        <div className="font-bold text-lg">Logo</div>
                    </div>
                    <div className="hidden md:block w-1/3 text-center">
                        <div className="hidden md:flex justify-center">
                            <div
                                onClick={navigateToHome}
                                className="nav-link relative select-none cursor-pointer"
                            >
                                Home
                                <span className="absolute bottom-0 left-0"></span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 md:w-1/3 text-right">
                        <div className="relative inline-block" ref={parentRef}>
                            <div
                                onClick={toggleMenu}
                                className="flex items-center cursor-pointer"
                            >
                                <span className="mr-2 select-none">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : "Account"}
                                </span>
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-black hover:border"></div>
                            </div>
                            {isOpen && (
                                <div
                                    className="bg-white text-black fixed right-0 mt-2 border-b-2 border-l-2 border-black select-none"
                                    style={{ width: `${dropdownWidth}px` }}
                                >
                                    {windowWidth < 768 ? menuItems : null}
                                    <ul className="cursor-pointer">
                                        {!user && (
                                            <li
                                                className="border-b p-2 hover:bg-slate-100 active:bg-slate-200 border-black text-start"
                                                onClick={navigateToLogin}
                                            >
                                                <div>Login</div>
                                            </li>
                                        )}
                                        {user && (
                                            <li
                                                className="p-2 hover:bg-slate-100 active:bg-slate-200 text-start"
                                                onClick={() => {
                                                    logout()
                                                    navigate("/")
                                                }}
                                            >
                                                <div>Log Out</div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex justify-center h-full w-screen font-bold px-2 bg-white text-black">
                <div className="container">
                    <div className="flex justify-between mt-14 p-2 md:p-0 md:py-2">
                        <div className="flex w-1/2 space-x-2">
                            <button
                                onClick={() => switchView("orders")}
                                className="border-2 border-black px-2 h-10 transition-all duration-75 ease-in-out hover:bg-gray-700"
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => switchView("products")}
                                className="border-2 border-black px-2 h-10 transition-all duration-75 ease-in-out hover:bg-gray-700"
                            >
                                Products
                            </button>
                        </div>
                        <div className="flex w-1/2 md:justify-end space-x-2">
                            {currentView === "products" && (
                                <>
                                    <button className="flex-grow md:flex-none md:w-32 h-10 border-2 px-2 transition-all duration-75 ease-in-out border-black bg-white hover:bg-red-600 hover:text-white">
                                        Reset
                                    </button>
                                    <button className="w-10 h-10 border-2 transition-all duration-75 ease-in-out border-black bg-white hover:text-white">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFUlEQVR4nO2aSwrCMBRFzzbqVF2TvzVoXYaTbsztKDqMCBFEtAW1MTXnwB0VShOa9+67BEREREREJDEjYB5VURgr4AiEqAOwpBCmwPlu8TedgAkFsH2y+Js2FEDTsgHXZ39P4wbgHxA8AlgDgkUQu0CwDaIPCBohdIJBK8ywZoEpUAO7N7RvscL7N99ZpxylVy/m+V/rnCJUGT0kObnp2He8tshgkV26Zoy9Mc9ggV2a9bkBVQwwQ6Y6pEiYlzHADJnpFI9oEsYxwMylDW7iNw2C5h+M0Ce4AfgH4BHAGoBFELsAtkH0AWiE0AmiFaagWaBuscJrCmDScklqMCPtN0KVx2tyycKMXKhKvigpIiIiIsJvuQBJNvgVdT6bCQAAAABJRU5ErkJggg==" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {currentView === "orders" && null}
                </div>
            </div>
        </div>
    )
}

export default Admin
