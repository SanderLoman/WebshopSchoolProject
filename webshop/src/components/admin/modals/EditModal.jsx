import React, { useState } from "react"

// EditModal Component: Modal for editing an existing product.
// Props:
// - isOpen: Boolean indicating if the modal is open.
// - setIsOpen: Function to update the isOpen state.
// - onEdit: Function to handle product edit.
// - product: The product object to be edited.
const EditModal = ({ isOpen, setIsOpen, onEdit, product }) => {
    // State for form fields initialized with product properties.
    const [name, setName] = useState(product ? product.name : "")
    const [price, setPrice] = useState(product ? product.price : "")
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "")

    // Function to close the modal.
    const handleClose = () => {
        setIsOpen(false)
    }

    // Function to handle outside click (clicking the backdrop to close).
    const handleOutsideClick = (event) => {
        if (event.target.id === "crud-modal") {
            handleClose()
        }
    }

    // Function to handle form submission.
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Initialize the update object
        let updatedProduct = {}

        // Check if the name has changed and is not empty
        if (name !== product.name && name.trim() !== "") {
            updatedProduct.name = name
        }

        // Check if the image URL has changed and is not empty
        if (imageUrl !== product.imageUrl && imageUrl.trim() !== "") {
            updatedProduct.imageUrl = imageUrl
        }

        // Parse and check the price if it has changed and is not empty
        if (price !== "" && parseFloat(price) !== product.price) {
            const parsedPrice = parseFloat(price)
            if (!isNaN(parsedPrice)) {
                updatedProduct.price = parsedPrice
            } else {
                console.error("Price must be a number")
                return
            }
        }

        // If no fields have been changed, do not proceed with the update
        if (Object.keys(updatedProduct).length === 0) {
            handleClose()
            return
        }

        // Call onEdit with the updated product
        onEdit({ id: product.id, ...updatedProduct })
        handleClose()
    }

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${
                isOpen ? "flex" : "hidden"
            } items-center justify-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50`}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
            onClick={handleOutsideClick}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Product
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    // name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                    // name="price"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product price"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Image URL
                                </label>
                                <input
                                    id="category"
                                    onChange={(e) =>
                                        setImageUrl(e.target.value)
                                    }
                                    placeholder="https://example.com/image.jpg"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center w-full text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                className="w-5 h-5 text-white me-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"
                                />
                            </svg>
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditModal
