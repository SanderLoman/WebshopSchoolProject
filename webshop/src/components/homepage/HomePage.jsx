// HomePage.jsx
import React, { useEffect } from "react"
import Navbar from "./navbar/Navbar.jsx"
import Hero from "./sections/hero/Hero.jsx"
import Shop from "./sections/shop/Shop.jsx"
import Footer from "./sections/footer/Footer.jsx"
import Reviews from "./sections/reviews/Review.jsx"
import Faq from "./sections/faq/Faq.jsx"
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Shop />
            <Reviews />
            <Faq />
            <Footer />
        </div>
    )
}

export default HomePage
