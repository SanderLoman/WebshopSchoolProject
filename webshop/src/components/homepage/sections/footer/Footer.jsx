import React from "react"

const Footer = () => {
    return (
        <footer className="bg-neutral-200 dark:bg-gray-900 dark:text-white p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/4 mb-6 md:mb-auto">
                        <a
                            href="/"
                            className="flex items-center md:mb-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                        >
                            Webshop
                        </a>
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
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Brand Center
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h5 className="uppercase font-semibold mb-2.5">
                                    Help Center
                                </h5>
                                <ul className="text-sm">
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Discord Server
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h5 className="uppercase font-semibold mb-2.5">
                                    Legal
                                </h5>
                                <ul className="text-sm">
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Licensing
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="#"
                                            className="hover:text-gray-300"
                                        >
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-xs text-gray-400 text-center">
                        © 2022-2023 Webshop™. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
