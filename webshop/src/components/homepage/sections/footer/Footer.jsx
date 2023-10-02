import React from "react"
import { useDarkMode } from "../../../darkmode/DarkModeContext.jsx"
import "./Footer.css"

const Footer = () => {
    const { isDarkMode } = useDarkMode()

    return (
        <div
            className={`flex flex-wrap justify-center p-5 border-t-2 text-center ${
                isDarkMode
                    ? "bg-[#1d242c] text-white border-gray-700"
                    : "bg-white text-black"
            }`}
        >
            <div className="footer-link p-2 mx-auto md:w-1/4 lg:w-1/6">
                <h3 className="font-bold mb-2">About Us</h3>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Our Story
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Team
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-link p-2 mx-auto md:w-1/4 lg:w-1/6">
                <h3 className="font-bold mb-2">Contact</h3>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Email
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Phone
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-link p-2 mx-auto md:w-1/4 lg:w-1/6">
                <h3 className="font-bold mb-2">Terms & Conditions</h3>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Terms of Service
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Privacy Policy
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-link p-2 mx-auto md:w-1/4 lg:w-1/6">
                <h3 className="font-bold mb-2">Privacy Policy</h3>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Cookies
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:opacity-80 active:opacity-60"
                        >
                            Data
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
