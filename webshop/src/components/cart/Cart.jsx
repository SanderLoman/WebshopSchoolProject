import React, { useContext } from "react"
import { CartContext } from "../providers/CartProvider.jsx"

const Cart = ({ showCart, setshowCart }) => {
    // Use the CartContext
    const { cartItems, clearCart } = useContext(CartContext)

    if (!showCart) return null

    const handleContentClick = (e) => {
        e.stopPropagation()
    }

    // NOTE: we need to make a checkout function
    const handleCheckout = () => {
        setshowCart(false)
    }

    // NOTE: maybe improve this later
    const handleClearCart = () => {
        clearCart()
        setshowCart(false)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setshowCart(false)}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
        >
            <div
                className="relative w-full max-w-2xl mx-auto"
                onClick={handleContentClick}
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Shopping Cart
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setshowCart(false)}
                        ></button>
                    </div>
                    {/* Map over cartItems to list them */}
                    <div className="p-6 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id}>
                                {/* Render cart item */}
                                {item.name} - Quantity: {item.quantity}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        {/* Checkout button */}
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleCheckout}
                        >
                            Go To Checkout!
                        </button>
                        {/* Decline button */}
                        <button
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => setshowCart(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
