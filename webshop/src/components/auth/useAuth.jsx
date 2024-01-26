import { useState, useEffect } from "react"

const useAuth = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    )
    const [authData, setAuthData] = useState([])

    const updateProfile = (updatedUser) => {
        // Temp
        console.log("Updating user profile:", updatedUser)

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4500/api/authData",
                )
                if (response.ok) {
                    const data = await response.json()
                    console.log("Auth data:", data)
                    setAuthData(data)
                } else {
                    console.error("Failed to fetch auth data")
                }
            } catch (error) {
                console.error("An error occurred:", error)
            }
        }
        fetchAuthData()
    }, [])

    const login = (email, password) => {
        if (!authData) {
            return false // Data not yet available
        }

        const foundUser = authData.find(
            (u) => u.email === email && u.password === password,
        )

        if (foundUser) {
            // Temp
            console.log("Found user:", foundUser)

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
                }),
            })

            await res.json()

            if (res.status === 201) {
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

    return {
        user,
        login,
        register,
        logout,
        updateProfile,
    }
}

export default useAuth
