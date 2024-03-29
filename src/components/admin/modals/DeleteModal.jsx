import React from "react"

// DeleteModal Component: Modal for confirming product deletion.
// Props:
// - isOpen: Boolean indicating if the modal is open.
// - setIsOpen: Function to update the isOpen state.
// - onDelete: Function to handle product deletion.
// - productId: ID of the product to be deleted.
const DeleteModal = ({ isOpen, setIsOpen, onDelete, productId }) => {
    // Function to close the modal.
    const handleClose = () => {
        setIsOpen(false)
    }

    // Function to handle outside click (clicking the backdrop to close).
    const handleOutsideClick = (event) => {
        // Close modal if clicking outside of the modal content
        if (event.target.id === "popup-modal") {
            handleClose()
        }
    }

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className={`${
                isOpen ? "flex" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
            onClick={handleOutsideClick}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-4 md:p-5 text-center">
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <button
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                            onClick={() => {
                                onDelete(productId)
                                setIsOpen(false)
                            }}
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={handleClose}
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
