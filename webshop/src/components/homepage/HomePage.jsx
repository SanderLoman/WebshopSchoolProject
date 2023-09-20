// HomePage.jsx
import React from "react"
import Navbar from "./navbar/Navbar.jsx"
import Hero from "./sections/hero/Hero.jsx"
import Main from "./sections/main/Main.jsx"
import { useDarkMode } from "../darkmode/DarkModeContext.jsx"
import "./HomePage.css"

const HomePage = () => {
    const { isDarkMode } = useDarkMode()

    return (
        <div
            className={`${
                isDarkMode ? "dark:bg-[#1d242c] dark:text-white" : ""
            }`}
        >
            <Navbar />
            <Hero />
            <Main />
        </div>
    )
}

export default HomePage
