import React from "react"
import "./Faq.css"

// Faq Component: Displays a Frequently Asked Questions section.
const Faq = () => {
    return (
        <div id="faq" className="w-full h-max bg-neutral-200 dark:bg-gray-900">
            <div className="flex flex-col justify-center h-full w-5/6 md:w-3/4 mx-auto p-4 md:p-8 lg:p-12 xl:p-16">
                <div className="w-full text-center text-black dark:text-white text-4xl font-medium">
                    FAQ
                </div>
                <div
                    id="accordion-flush"
                    data-accordion="collapse"
                    data-active-classes="bg-neutral-200 dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                >
                    <h2 id="accordion-flush-heading-1">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400 gap-3"
                            data-accordion-target="#accordion-flush-body-1"
                            aria-expanded="false"
                            aria-controls="accordion-flush-body-1"
                        >
                            <span>How do I track my order?</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-1"
                        className="hidden"
                        aria-labelledby="accordion-flush-heading-1"
                    >
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-black dark:text-white">
                                Once your order is shipped, you will receive an
                                email with a tracking number. You can use this
                                number on our website to track your order's
                                status.
                            </p>
                        </div>
                    </div>
                    <h2 id="accordion-flush-heading-2">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400 gap-3"
                            data-accordion-target="#accordion-flush-body-2"
                            aria-expanded="false"
                            aria-controls="accordion-flush-body-2"
                        >
                            <span>What payment methods do you accept?</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-2"
                        className="hidden"
                        aria-labelledby="accordion-flush-heading-2"
                    >
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-black dark:text-white">
                                We accept various payment methods including
                                credit/debit cards, PayPal, and other digital
                                wallets. For more details, please visit our
                                Payment Information page.
                            </p>
                        </div>
                    </div>
                    <h2 id="accordion-flush-heading-3">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400 gap-3"
                            data-accordion-target="#accordion-flush-body-3"
                            aria-expanded="false"
                            aria-controls="accordion-flush-body-3"
                        >
                            <span>What Is Your Return Policy?</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-3"
                        className="hidden"
                        aria-labelledby="accordion-flush-heading-3"
                    >
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-black dark:text-white">
                                We offer a 30-day return policy. If you're not
                                satisfied with your purchase, you can return it
                                within 30 days for a full refund or exchange.
                                Please read our Return Policy for more details.
                            </p>
                        </div>
                    </div>
                    <h2 id="accordion-flush-heading-4">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400 gap-3"
                            data-accordion-target="#accordion-flush-body-4"
                            aria-expanded="false"
                            aria-controls="accordion-flush-body-4"
                        >
                            <span>How can I change or cancel my order?</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-4"
                        className="hidden"
                        aria-labelledby="accordion-flush-heading-4"
                    >
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-black dark:text-white">
                                To change or cancel your order, please contact
                                our customer service team as soon as possible.
                                Note that once the order is processed, changes
                                or cancellations may not be possible.
                            </p>
                        </div>
                    </div>
                    <h2 id="accordion-flush-heading-5">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400 gap-3"
                            data-accordion-target="#accordion-flush-body-5"
                            aria-expanded="false"
                            aria-controls="accordion-flush-body-5"
                        >
                            <span>Do you ship internationally?</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-5"
                        className="hidden"
                        aria-labelledby="accordion-flush-heading-5"
                    >
                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-black dark:text-white">
                                Yes, we ship to various countries worldwide.
                                Shipping costs and times may vary depending on
                                the destination. Please visit our Shipping
                                Information page for more details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq
