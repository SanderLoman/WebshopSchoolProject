import React from "react"
import "./Testimonials.css"

// Testimonials Component: Displays the testimonials section of the website.
const Testimonials = () => {
    return (
        <section
            id="testimonials"
            className="h-max flex justify-center items-center flex-wrap bg-neutral-200 dark:bg-gray-900"
        >
            <div className="w-full md:w-1/2 px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                    <svg
                        className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                        />
                    </svg>
                    <blockquote>
                        <p className="text-2xl font-medium text-gray-900 dark:text-white">
                            "Absolutely love this webshop! The range of products
                            is fantastic, and everything I've ordered has been
                            of superb quality. Their customer service is also
                            top-notch - very friendly and helpful. Highly
                            recommended!"
                        </p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <img
                            className="w-6 h-6 rounded-full"
                            src="http://localhost:4500/pfp/profile-pic-1706827333553-1706827339185.jpg"
                            alt="pfp"
                        />
                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 dark:text-white">
                                Ethan Reynolds
                            </div>
                            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                Customer
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <div className="w-full md:w-1/2  px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                    <svg
                        className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                        />
                    </svg>
                    <blockquote>
                        <p className="text-2xl font-medium text-gray-900 dark:text-white">
                            "I've been a regular customer for over a year now,
                            and I've never been disappointed. The selection is
                            great, prices are reasonable, and the shipping is
                            always fast. Plus, their eco-friendly packaging is a
                            big plus for me!"
                        </p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <img
                            className="w-6 h-6 rounded-full"
                            src="http://localhost:4500/pfp/profile-pic-1707069538033-1707069539405.jpg"
                            alt="pfp"
                        />
                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 dark:text-white">
                                Zoe Bennett
                            </div>
                            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                Customer
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <div className="w-full md:w-1/2  px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                    <svg
                        className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                        />
                    </svg>
                    <blockquote>
                        <p className="text-2xl font-medium text-gray-900 dark:text-white">
                            "This webshop is a hidden gem! I've found so many
                            unique items here that aren't available anywhere
                            else. The website is user-friendly, and checkout is
                            a breeze. Definitely my go-to place for special
                            gifts."
                        </p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <img
                            className="w-6 h-6 rounded-full"
                            src="http://localhost:4500/pfp/profile-pic-1707120890036-1707120894127.jpg"
                            alt="pfp"
                        />
                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 dark:text-white">
                                Aiden Clarke
                            </div>
                            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                Customer
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

export default Testimonials
