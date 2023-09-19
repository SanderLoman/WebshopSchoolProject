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
            <nav className="z-10 absolute bg-white w-full text-black text-xl">
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
                                    className="fixed right-0 mt-2 bg-white text-black shadow-lg rounded-bl-xl"
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
        </div>
    )
}

export default Admin
