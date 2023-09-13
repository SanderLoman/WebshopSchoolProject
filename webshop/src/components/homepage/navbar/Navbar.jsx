import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth.jsx"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownWidth, setDropdownWidth] = useState(null)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const parentRef = useRef(null)

    useEffect(() => {
        console.log("User state has changed:", user)
    }, [user])

    useEffect(() => {
        if (isOpen && parentRef.current) {
            setDropdownWidth(parentRef.current.offsetWidth)
        }
    }, [isOpen])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (
        <nav className="z-10 absolute bg-white w-full text-black">
            <div className="container mx-auto flex justify-between items-center p-2">
                <div className="w-1/3">
                    <div className="font-bold text-lg">Logo</div>
                </div>

                <div className="w-1/3 text-center">
                    <div className="hidden md:flex justify-center space-x-4">
                        <a href="/" className="">
                            Home
                        </a>
                        <a href="/" className="">
                            About
                        </a>
                        <a href="/" className="">
                            Services
                        </a>
                        <a href="/" className="">
                            Contact
                        </a>
                    </div>
                </div>

                <div className="w-1/3 text-right">
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
                                className="absolute right-0 mt-2 bg-white text-black shadow-lg"
                                style={{ width: `${dropdownWidth}px` }}
                            >
                                <ul>
                                    {!user && (
                                        <li className="border-b p-2">
                                            <button onClick={navigateToLogin}>
                                                Login
                                            </button>
                                        </li>
                                    )}
                                    {user && user.role !== "admin" && (
                                        <li className="border-b p-2">
                                            <a onClick={null}>Account</a>
                                        </li>
                                    )}
                                    {user && user.role === "admin" && (
                                        <li className="border-b p-2">
                                            <a onClick={null}>Admin</a>
                                        </li>
                                    )}
                                    {user && (
                                        <li className="p-2">
                                            <a onClick={logout}>Log Out</a>
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
