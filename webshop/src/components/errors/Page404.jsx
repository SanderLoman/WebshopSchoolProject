import React from "react"
import { useNavigate } from "react-router-dom"
import "./Page404.css"

// Page404 Component: Displays a 404 Not Found page.
const Page404 = () => {
    const navigate = useNavigate()

    // Function to navigate back to the homepage.
    const navigateHome = () => {
        navigate("/")
    }

    return (
        <section className="h-screen flex items-center bg-neutral-200 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-600">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Something's missing.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry, we can't find that page. You'll find lots to
                        explore on the home page.
                    </p>
                    <button
                        className="inline-flex text-black dark:text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                        onClick={navigateHome}
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Page404
