import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../../darkmode/DarkModeContext.jsx"
import useAuth from "../../auth/useAuth.jsx"
import "./Navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownWidth, setDropdownWidth] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const { user, logout } = useAuth()
    const parentRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("User state has changed:", user)
    }, [user])

    useEffect(() => {
        if (isOpen && parentRef.current) {
            setDropdownWidth(parentRef.current.offsetWidth + 20)
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

    const navigateToAdmin = () => {
        navigate("/admin")
    }

    const menuItems = (
        <ul className="cursor-pointer">
            <li
                className={`border-b p-2 ${
                    isDarkMode
                        ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                        : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                }  text-start`}
            >
                <div onClick={null}>Link1</div>
            </li>
            <li
                className={`border-b p-2 ${
                    isDarkMode
                        ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                        : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                }  text-start`}
            >
                <div onClick={null}>Link2</div>
            </li>
            <li
                className={`border-b p-2 ${
                    isDarkMode
                        ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                        : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                }  text-start`}
            >
                <div onClick={null}>Link3</div>
            </li>
        </ul>
    )

    return (
        <nav
            className={`${
                isDarkMode
                    ? "bg-[#1d242c] border-b-2 border-teal-500 text-white text-xl font-medium"
                    : "z-10 absolute bg-white w-full text-black text-xl border-b-2 border-black font-medium"
            }`}
        >
            <div className="flex justify-between items-center p-2">
                <div className="w-1/2 md:w-1/3">
                    <div className="font-bold">Logo</div>
                </div>
                <div className="hidden md:block w-1/3 text-center">
                    <div className="hidden md:flex justify-center space-x-4">
                        <div
                            onClick={null}
                            className="nav-link relative select-none cursor-pointer"
                        >
                            Link1
                            <span className="absolute bottom-0 left-0"></span>
                        </div>
                        <div
                            onClick={null}
                            className="nav-link relative select-none cursor-pointer"
                        >
                            Link2
                            <span className="absolute bottom-0 left-0"></span>
                        </div>
                        <div
                            onClick={null}
                            className="nav-link relative select-none cursor-pointer"
                        >
                            Link3
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
                            <div>
                                <span className="mr-2 nav-link relative select-none">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : "Account"}
                                </span>
                                <span className="absolute bottom-0 left-0"></span>
                            </div>
                            <div
                                className={`${
                                    isDarkMode
                                        ? "w-10 h-10 rounded-full bg-[#1d242c] border-2 hover:border border-teal-500"
                                        : "w-10 h-10 rounded-full bg-white border-2  border-black hover:border"
                                }`}
                            ></div>
                        </div>
                        {isOpen && (
                            <div
                                className={`${
                                    isDarkMode
                                        ? "bg-[#1d242c] text-white border-teal-500"
                                        : "bg-white text-black"
                                } absolute right-0 mt-2 border-b-2 border-l-2 border-black select-none -mr-2`}
                                style={{ width: `${dropdownWidth}px` }}
                            >
                                {windowWidth < 768 ? menuItems : null}
                                <ul className="cursor-pointer">
                                    {!user && (
                                        <li
                                            className={`p-2 ${
                                                isDarkMode
                                                    ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                                                    : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                                            }  text-start`}
                                            onClick={navigateToLogin}
                                        >
                                            <div>Login</div>
                                        </li>
                                    )}
                                    {user && user.role !== "admin" && (
                                        <li
                                            className={`p-2 ${
                                                isDarkMode
                                                    ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                                                    : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                                            }  text-start`}
                                            onClick={null}
                                        >
                                            <div>Account</div>
                                        </li>
                                    )}
                                    {user && user.role === "admin" && (
                                        <li
                                            className={`p-2 ${
                                                isDarkMode
                                                    ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                                                    : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                                            }  text-start`}
                                            onClick={navigateToAdmin}
                                        >
                                            <div>Admin</div>
                                        </li>
                                    )}
                                    <button
                                        onClick={toggleDarkMode}
                                        className={`p-2 w-full ${
                                            isDarkMode
                                                ? "hover:bg-[#12161b] active:hover:bg-[#101316] border-b-2 border-teal-500"
                                                : "hover:bg-slate-100 active:bg-slate-200 border-b-2 border-black"
                                        }  text-start`}
                                    >
                                        {isDarkMode
                                            ? "Toggle Light Mode"
                                            : "Toggle Dark Mode"}
                                    </button>
                                    {user && (
                                        <li
                                            className={`p-2 ${
                                                isDarkMode
                                                    ? "hover:bg-[#12161b] active:hover:bg-[#101316]"
                                                    : "hover:bg-slate-100 active:bg-slate-200"
                                            }  text-start`}
                                            onClick={logout}
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
    )
}

export default Navbar
