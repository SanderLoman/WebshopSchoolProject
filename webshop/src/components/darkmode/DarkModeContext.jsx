// import React, { createContext, useContext, useEffect, useState } from "react"

// const DarkModeContext = createContext()

// export const useDarkMode = () => {
//     return useContext(DarkModeContext)
// }

// export const DarkModeProvider = ({ children }) => {
//     // Initialize state from localStorage
//     const [isDarkMode, setIsDarkMode] = useState(() => {
//         const savedMode = localStorage.getItem("isDarkMode")
//         return savedMode ? JSON.parse(savedMode) : false
//     })

//     useEffect(() => {
//         // Update localStorage whenever isDarkMode changes
//         localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))

//         if (isDarkMode) {
//             document.documentElement.classList.add("dark")
//         } else {
//             document.documentElement.classList.remove("dark")
//         }
//     }, [isDarkMode])

//     const value = { isDarkMode, setIsDarkMode }

//     return (
//         <DarkModeContext.Provider value={value}>
//             {children}
//         </DarkModeContext.Provider>
//     )
// }
