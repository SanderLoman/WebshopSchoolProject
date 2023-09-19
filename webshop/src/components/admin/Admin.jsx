import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../components/auth/useAuth.jsx"
import "./Admin.css"

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownWidth, setDropdownWidth] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const parentRef = useRef(null)

    useEffect(() => {
        console.log("User state has changed:", user)
    }, [user])

    useEffect(() => {
        if (isOpen && parentRef.current) {
            setDropdownWidth(parentRef.current.offsetWidth + 10)
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

    const menuItems = (
        <ul className="cursor-pointer">
            <li className="border-b p-2 hover:bg-slate-100 active:bg-slate-200 select-none cursor-pointer">
                <div onClick={navigateToHome}>Home</div>
            </li>
        </ul>
    )

    return (
        <div className="z-0 h-screen w-screen">
            <nav className="z-10 absolute bg-white w-full text-black text-xl border-b-2 border-black font-medium">
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
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:border"></div>
                            </div>
                            {isOpen && (
                                <div
                                    className="fixed right-0 mt-2 bg-white text-black border-b-2 border-l-2 border-black"
                                    style={{ width: `${dropdownWidth}px` }}
                                >
                                    {windowWidth < 768 ? menuItems : null}
                                    <ul className="cursor-pointer">
                                        {!user && (
                                            <li
                                                className="border-b p-2 hover:bg-slate-100 active:bg-slate-200 rounded-bl-xl"
                                                onClick={navigateToLogin}
                                            >
                                                <div>Login</div>
                                            </li>
                                        )}
                                        {user && (
                                            <li
                                                className="p-2 hover:bg-slate-100 active:bg-slate-200 rounded-bl-xl"
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
            <div className="flex justify-center h-full w-screen font-bold">
                <div className="container">
                    {/* Buttons */}
                    <div className="flex justify-between mt-14 p-4">
                        {/* Buttons on the top-left */}
                        <div className="flex w-1/2 space-x-2">
                            <button className="border-2 border-black px-2 bg-white">
                                Orders
                            </button>
                            <button className="border-2 border-black px-2 bg-white">
                                Products
                            </button>
                        </div>
                        {/* Buttons on the top-right */}
                        <div className="flex w-1/2 justify-between md:justify-end space-x-2">
                            <button className="border-2 border-black px-2 bg-white hover:bg-red-600 hover:text-white transition-all duration-150 ease-in-out">
                                Reset Products
                            </button>
                            <button className="w-10 h-10 border-2 border-black bg-white">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFUlEQVR4nO2aSwrCMBRFzzbqVF2TvzVoXYaTbsztKDqMCBFEtAW1MTXnwB0VShOa9+67BEREREREJDEjYB5VURgr4AiEqAOwpBCmwPlu8TedgAkFsH2y+Js2FEDTsgHXZ39P4wbgHxA8AlgDgkUQu0CwDaIPCBohdIJBK8ywZoEpUAO7N7RvscL7N99ZpxylVy/m+V/rnCJUGT0kObnp2He8tshgkV26Zoy9Mc9ggV2a9bkBVQwwQ6Y6pEiYlzHADJnpFI9oEsYxwMylDW7iNw2C5h+M0Ce4AfgH4BHAGoBFELsAtkH0AWiE0AmiFaagWaBuscJrCmDScklqMCPtN0KVx2tyycKMXKhKvigpIiIiIsJvuQBJNvgVdT6bCQAAAABJRU5ErkJggg==" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
