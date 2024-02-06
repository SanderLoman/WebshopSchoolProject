import React, { createContext, useState, useEffect } from "react"

// UserContext creation using React's createContext.
export const UserContext = createContext()

// UserProvider: Manages user authentication, profile, and related operations.
export const UserProvider = ({ children }) => {
    // State for storing the current user's information.
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    )

    // State for storing authentication data.
    const [authData, setAuthData] = useState([])

    // Update user profile information.
    const updateProfile = (updatedUser) => {
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    // Fetch authentication data from the server.
    const fetchAuthData = async () => {
        try {
            const response = await fetch("http://localhost:4500/api/authData")
            if (response.ok) {
                const data = await response.json()
                setAuthData(data)
            } else {
                console.error("Failed to fetch auth data")
            }
        } catch (error) {
            console.error("An error occurred:", error)
        }
    }

    // Fetch auth data on component mount, to prevent styling bugs.
    useEffect(() => {
        fetchAuthData()
    }, [])

    // Handle user login.
    const login = async (email, password) => {
        await fetchAuthData()

        if (!authData) {
            return false // Data not yet available
        }

        const foundUser = authData.find(
            (u) => u.email === email && u.password === password,
        )

        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem("user", JSON.stringify(foundUser))
            return true
        } else {
            return false
        }
    }

    const register = async (
        email,
        password,
        firstName,
        lastName,
        role,
        pfp,
        cart,
        boughtProducts,
    ) => {
        try {
            const res = await fetch("http://localhost:4500/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    role,
                    pfp,
                    cart,
                    boughtProducts,
                }),
            })

            await res.json()

            if (res.status === 201) {
                fetchAuthData()
                return true // Registration successful
            } else if (res.status === 409) {
                return false // User already exists
            }
        } catch (error) {
            console.error("An error occurred:", error)
            return false // Registration failed
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        return false
    }

    return (
        <UserContext.Provider
            value={{ user, login, register, logout, updateProfile }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
