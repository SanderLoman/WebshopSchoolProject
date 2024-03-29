import React from "react"

// Footer Component: Displays the footer section of the website.
const Footer = () => {
    return (
        <footer className="pt-20 bg-neutral-200 dark:bg-gray-900 dark:text-white p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/4 mb-6 md:mb-auto">
                        <div className="flex items-center md:mb-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Webshop
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            Explore the latest in fashion, style, and home. Fast
                            shipping, effortless shopping. Thank you for
                            choosing us!
                        </p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className="flex flex-wrap justify-between">
                            <div className="mb-6">
                                <h5 className="uppercase font-semibold mb-2.5">
                                    Company
                                </h5>
                                <ul className="text-sm">
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            About
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Careers
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Brand Center
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Blog
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h5 className="uppercase font-semibold mb-2.5">
                                    Help Center
                                </h5>
                                <ul className="text-sm">
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Discord Server
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Twitter
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Facebook
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Contact Us
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h5 className="uppercase font-semibold mb-2.5">
                                    Legal
                                </h5>
                                <ul className="text-sm">
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Privacy Policy
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Licensing
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <div className="hover:text-gray-300">
                                            Terms
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-xs text-gray-400 text-center">
                        © 2023-2024 Webshop™. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
