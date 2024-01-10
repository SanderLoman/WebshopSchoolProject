import React from "react"
import { useNavigate } from "react-router-dom"
import "./AccessDenied.css"

const Page404 = () => {
    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/")
    }

    return (
        <section class="h-screen flex items-center bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center">
                    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-600">
                        403
                    </h1>
                    <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Access Denied.
                    </p>
                    <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry, you don't have access to this page. Please go back to the homepage.
                    </p>
                    <button
                        class="inline-flex text-black dark:text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
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
