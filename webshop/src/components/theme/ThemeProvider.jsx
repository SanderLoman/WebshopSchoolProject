import React, { createContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const [themeSettingMode, setThemeSettingMode] = useState(
        localStorage.getItem("themeSettingMode") || "system",
    )

    useEffect(() => {
        const root = document.documentElement
        root.className = theme
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem("themeSettingMode", themeSettingMode)

        if (themeSettingMode === "system") {
            const prefersDarkScheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            )
            setTheme(prefersDarkScheme.matches ? "dark" : "light")
        }
    }, [themeSettingMode])

    const setLightMode = () => {
        setTheme("light")
        setThemeSettingMode("light")
    }

    const setDarkMode = () => {
        setTheme("dark")
        setThemeSettingMode("dark")
    }

    const setSystemMode = () => {
        setThemeSettingMode("system")
    }

    return (
        <ThemeContext.Provider
            value={{ theme, setLightMode, setDarkMode, setSystemMode }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
