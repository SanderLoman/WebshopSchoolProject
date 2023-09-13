import { useState, useEffect } from "react"

const useAuth = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    )

    const [authData, setAuthData] = useState([])

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
            setUser(foundUser)
            localStorage.setItem("user", JSON.stringify(foundUser))
            return true // Login successful
        } else {
            return false // Login failed
        }
    }

    const register = async (email, password, firstName, lastName, role) => {
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
            }),
        })

        if (res.ok) {
            const newUser = { email, password, firstName, lastName, role }
            setAuthData([...authData, newUser])
            return true
        } else {
            return false
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return {
        user,
        login,
        register,
        logout,
    }
}

export default useAuth
