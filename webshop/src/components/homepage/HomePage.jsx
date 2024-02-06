// HomePage.jsx
import React from "react"
import Navbar from "./navbar/Navbar.jsx"
import Hero from "./sections/hero/Hero.jsx"
import Shop from "./sections/shop/Shop.jsx"
import Footer from "./sections/footer/Footer.jsx"
import Testimonials from "./sections/testimonials/Testimonials.jsx"
import Faq from "./sections/faq/Faq.jsx"
import "./HomePage.css"

// HomePage Component: Displays the homepage of the website.
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Shop />
            <Testimonials />
            <Faq />
            <Footer />
        </div>
    )
}

export default HomePage
