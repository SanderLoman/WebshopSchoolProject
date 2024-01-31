import React, { useState, useEffect, useContext } from "react"
import { CartContext } from "../../../providers/CartProvider"

const Shop = () => {
    const [products, setProducts] = useState([])
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4500/api/products",
                )
                const data = await response.json()
                console.log("Data:", data)
                // Directly check if data is an array since it's already the array of products
                if (Array.isArray(data)) {
                    setProducts(data)
                } else {
                    console.error(
                        "Products data is not in expected format:",
                        data,
                    )
                }
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (product, quantity) => {
        console.log(`Added ${quantity} of ${product.name} to the cart.`)
        addToCart({ ...product, quantity: parseInt(quantity) }) // Call addToCart with the product and quantity
    }

    const updateQuantity = (productId, action) => {
        setProducts(
            products.map((product) => {
                if (product.id === productId) {
                    let newQuantity = parseInt(
                        document.getElementById(`quantity-${productId}`).value,
                    )
                    if (action === "increment") {
                        newQuantity++
                    } else if (action === "decrement" && newQuantity > 1) {
                        newQuantity--
                    }
                    document.getElementById(`quantity-${productId}`).value =
                        newQuantity
                }
                return product
            }),
        )
    }

    return (
        <div
            id="shop"
            className="p-4 md:p-8 lg:p-12 xl:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12 xl:gap-16 bg-neutral-200 dark:bg-gray-900"
        >
            {Array.isArray(products) &&
                products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center rounded-none bg-neutral-100 dark:bg-gray-800 dark:text-white text-black"
                    >
                        <img
                            className="max-w-full"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                        <h3 className="mt-2 text-lg font-bold">
                            {product.name}
                        </h3>
                        <p className="mb-2 text-gray-700 dark:text-gray-400">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mb-4">
                            <button
                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                onClick={() =>
                                    updateQuantity(product.id, "decrement")
                                }
                                type="button"
                            >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h16"
                                    />
                                </svg>
                            </button>
                            <div>
                                <input
                                    type="number"
                                    id={`quantity-${product.id}`}
                                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                                    min="1"
                                    defaultValue="1"
                                    required
                                />
                            </div>
                            <button
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                onClick={() =>
                                    updateQuantity(product.id, "increment")
                                }
                                type="button"
                            >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="button"
                            id="successButton"
                            data-modal-target="successModal"
                            data-modal-toggle="successModal"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
                            onClick={() => {
                                const quantity = document.getElementById(
                                    `quantity-${product.id}`,
                                ).value
                                handleAddToCart(product, quantity)
                            }}
                        >
                            <svg
                                className="w-3.5 h-3.5 me-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 21"
                            >
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                ))}

            <div
                id="successModal"
                tabindex="-1"
                aria-hidden="true"
                class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
            >
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button
                            type="button"
                            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="successModal"
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="sr-only">Close</span>
                        </button>
                        <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                            <svg
                                aria-hidden="true"
                                class="w-8 h-8 text-green-500 dark:text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="sr-only">Success</span>
                        </div>
                        <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Added product to Cart!
                        </p>
                        <button
                            data-modal-toggle="successModal"
                            type="button"
                            class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
