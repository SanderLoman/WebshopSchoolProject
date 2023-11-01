import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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

    useEffect(() => {
        const localData = localStorage.getItem("isDarkMode")
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
        <div>
            <ToastContainer />
        </div>
    )
}

export default Admin
