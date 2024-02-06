import React, { createContext, useState, useEffect } from "react"

// ThemeContext creation using React's createContext.
const ThemeContext = createContext()

// ThemeProvider: Manages the theme settings for the application.
export const ThemeProvider = ({ children }) => {
    // State for light/dark theme.
    const [lightTheme, setTheme] = useState(
        localStorage.getItem("lightTheme") || "light",
    )

    // State for system theme preference.
    const [systemTheme, setthemeSystem] = useState(
        localStorage.getItem("systemTheme") || "system",
    )

    // Effect to apply the light theme and store it in localStorage.
    useEffect(() => {
        const root = document.documentElement
        root.className = lightTheme
        localStorage.setItem("lightTheme", lightTheme)
    }, [lightTheme])

    // Effect to handle system theme changes and store the preference.
    useEffect(() => {
        localStorage.setItem("systemTheme", systemTheme)

        // Automatically switch between light and dark mode based on system preference.
        if (systemTheme === "system") {
            const prefersDarkScheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            )
            setTheme(prefersDarkScheme.matches ? "dark" : "light")
        }
    }, [systemTheme])

    // Function to set light mode.
    const setLightMode = () => {
        setTheme("light")
        setthemeSystem("light")
    }

    // Function to set dark mode.
    const setDarkMode = () => {
        setTheme("dark")
        setthemeSystem("dark")
    }

    // Function to set system mode.
    const setSystemMode = () => {
        setthemeSystem("system")
    }

    // Providing the ThemeContext to child components.
    return (
        <ThemeContext.Provider
            value={{
                lightTheme,
                systemTheme,
                setLightMode,
                setDarkMode,
                setSystemMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
