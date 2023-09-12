import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../auth/useAuth.jsx"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (
        <nav className="z-10 absolute bg-gray-800 w-full text-white">
            <div className="container mx-auto flex justify-between items-center p-2">
                <div className="w-1/3">
                    {/* Logo */}
                    <div className="font-bold text-lg">Logo</div>
                </div>

                <div className="w-1/3 text-center">
                    {/* Menu */}
                    <div className="hidden md:flex justify-center space-x-4">
                        <a href="#" className="text-white">
                            Home
                        </a>
                        <a href="#" className="text-white">
                            About
                        </a>
                        <a href="#" className="text-white">
                            Services
                        </a>
                        <a href="#" className="text-white">
                            Contact
                        </a>
                    </div>
                </div>

                <div className="w-1/3 text-right">
                    {/* Profile Dropdown */}
                    <div className="relative inline-block">
                        <div
                            onClick={toggleMenu}
                            className="flex items-center cursor-pointer"
                        >
                            <span className="mr-2">
                                {user ? user.username : "Login"}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-white border border-white"></div>
                        </div>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black w-max rounded-md shadow-lg">
                                <ul>
                                    {!user && (
                                        <li className="border-b p-2">
                                            <a
                                                href="#"
                                                onClick={navigateToLogin}
                                            >
                                                Login
                                            </a>
                                        </li>
                                    )}
                                    {user && user.role !== "admin" && (
                                        <li className="border-b p-2">
                                            <a href="#" onClick={logout}>
                                                Account
                                            </a>
                                        </li>
                                    )}
                                    {user && user.role === "admin" && (
                                        <li className="border-b p-2">
                                            <a href="#" onClick={logout}>
                                                Admin
                                            </a>
                                        </li>
                                    )}
                                    <li className="p-2">
                                        <a href="#" onClick={logout}>
                                            Log Out
                                        </a>
                                    </li>
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
