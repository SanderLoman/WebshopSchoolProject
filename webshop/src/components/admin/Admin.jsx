import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useAuth from "../../components/auth/useAuth.jsx"
import "./Admin.css"

const Admin = () => {
    const { user } = useAuth()
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
            // Optionally handle the case when user is not admin or not logged in
            // For example, navigate to an access denied page or perform some other action
            navigate("/access-denied")
        }
    }, [user, navigate])

    // const navigateToLogin = () => {
    //     navigate("/login")
    // }

    // const navigateToHome = () => {
    //     navigate("/")
    // }

    return (
        <div className="h-screen bg-neutral-200 dark:bg-gray-900">
            <ToastContainer />
        </div>
    )
}

export default Admin
