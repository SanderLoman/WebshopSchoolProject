import React, { createContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [lightTheme, setTheme] = useState(localStorage.getItem("lightTheme") || "light")
    const [systemTheme, setthemeSystem] = useState(
        localStorage.getItem("systemTheme") || "system",
    )

    useEffect(() => {
        const root = document.documentElement
        root.className = lightTheme
        localStorage.setItem("lightTheme", lightTheme)
    }, [lightTheme])

    useEffect(() => {
        localStorage.setItem("systemTheme", systemTheme)

        if (systemTheme === "system") {
            const prefersDarkScheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            )
            setTheme(prefersDarkScheme.matches ? "dark" : "light")
        }
    }, [systemTheme])

    const setLightMode = () => {
        setTheme("light")
        setthemeSystem("light")
    }

    const setDarkMode = () => {
        setTheme("dark")
        setthemeSystem("dark")
    }

    const setSystemMode = () => {
        setthemeSystem("system")
    }

    return (
        <ThemeContext.Provider
            value={{ lightTheme, systemTheme, setLightMode, setDarkMode, setSystemMode }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
