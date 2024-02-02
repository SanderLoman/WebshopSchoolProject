import React, { useEffect, useContext } from "react"
import { UserContext } from "../providers/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Admin.css"

const Admin = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        // Only proceed if the user exists and is an admin
        if (user && user.role === "admin") {
            fetch("http://localhost:4500/api/orders")
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        // setOrders(data)
                    } else {
                        console.error("Invalid API response:", data)
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch orders:", err)
                })
        } else {
            navigate("/access-denied")
        }
    }, [user, navigate])

    return (
        <div className="h-screen bg-neutral-200 dark:bg-gray-900">
            <ToastContainer />
        </div>
    )
}

export default Admin
