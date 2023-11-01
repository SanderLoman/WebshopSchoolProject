// HomePage.jsx
import React, { useEffect } from "react"
import Navbar from "./navbar/Navbar.jsx"
import Hero from "./sections/hero/Hero.jsx"
import Shop from "./sections/main/Shop.jsx"
import Footer from "./sections/footer/Footer.jsx"
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Shop />
            <Footer />
        </div>
    )
}

export default HomePage
