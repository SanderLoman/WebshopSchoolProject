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
        if (user && user.role !== "admin") {
            navigate("/access-denied")
        }
    }, [user, navigate])

    useEffect(() => {
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
    }, [])

    const navigateToLogin = () => {
        navigate("/login")
    }

    const navigateToHome = () => {
        navigate("/")
    }

    return (
        <div>
            <ToastContainer />
        </div>
    )
}

export default Admin
