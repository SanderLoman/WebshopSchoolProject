// HomePage.jsx
import React from "react"
import Navbar from "./navbar/Navbar.jsx"
import Hero from "./sections/hero/Hero.jsx"
import Main from "./sections/main/Main.jsx"
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Main />
        </div>
    )
}

export default HomePage
