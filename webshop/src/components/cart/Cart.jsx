import React, { useContext } from "react"
import { CartContext } from "../providers/CartProvider.jsx"

const Cart = ({ showCart, setshowCart }) => {
    const { cartItems, clearCart } = useContext(CartContext)

    if (!showCart) return null

    const handleContentClick = (e) => {
        e.stopPropagation()
    }

    const handleCheckout = () => {
        setshowCart(false)
    }

    const handleClearCart = () => {
        clearCart()
        setshowCart(false)
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

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
                            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg h-8 ml-auto inline-flex justify-center items-center dark:hover:text-white"
                            onClick={() => setshowCart(false)}
                        >
                            Close
                        </button>
                    </div>
                    {/* Table View */}
                    {cartItems.length > 0 ? (
                        <div className="relative overflow-x-auto max-h-[calc(50vh)] overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Qty
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                ${item.price.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                Your cart is empty.
                            </p>
                        </div>
                    )}
                    {/* Checkout button */}
                    <div className="flex items-center justify-between p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        {/* Total Price Display */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-right">
                                Total: ${totalPrice.toFixed(2)}
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={handleCheckout}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Go To Checkout
                            <svg
                                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
