import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../providers/CartProvider.jsx"
import "./Checkout.css"

const Checkout = () => {
    const { cartItems, clearCart, removeFromCart } = useContext(CartContext)
    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/")
    }

    const handleOrderNow = () => {
        // Logic to handle the order submission
        // Trigger the success message modal here
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-neutral-100 dark:bg-gray-800 p-4">
            <div className="absolute top-4 left-4">
                <button
                    type="button"
                    onClick={navigateHome}
                    className="text-white bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:ring-blue-800"
                >
                    <svg
                        className="w-4 h-4 transform rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                    <span className="sr-only">Go back</span>
                </button>
            </div>
            <div className="overflow-x-auto w-full">
                {cartItems.length > 0 ? (
                    <div className="overflow-y-auto h-[calc(50vh)]">
                        <table className="w-1/2 mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
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
                                    <th scope="col" className="px-6 py-3">
                                        hello
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
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
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-6 h-[calc(50vh)]">
                        <p className="flex justify-center items-center h-full text-lg text-gray-700 dark:text-gray-300">
                            Your cart is empty.
                        </p>
                    </div>
                )}
            </div>
            <div className="flex space-x-2 mt-4">
                <div class="relative max-w-sm">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input
                        datepicker
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                    />
                </div>

                {/* Payment Method Dropdown */}
                <div className="mb-4">
                    <label
                        htmlFor="paymentMethod"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Payment Method
                    </label>
                    <select
                        id="paymentMethod"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bankTransfer">Bank Transfer</option>
                    </select>
                </div>
                {/* Order Now Button */}
                <button
                    type="button"
                    onClick={handleOrderNow}
                    className="text-white bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Order Now
                </button>
            </div>
        </div>
    )
}

export default Checkout

// import React from "react"
// import { useNavigate } from "react-router-dom"
// import "./Checkout.css"

// const Checkout = ({ cartItems = [] }) => {
//     const navigate = useNavigate()

//     const navigateHome = () => {
//         navigate("/")
//     }

//     return (
//         <div className="flex h-screen w-screen justify-center items-center bg-neutral-100 dark:bg-gray-800">
//             <div className="absolute top-4 left-4">
//                 <button
//                     type="button"
//                     onClick={navigateHome}
//                     className="text-white bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:ring-blue-800"
//                 >
//                     <svg
//                         className="w-4 h-4 transform rotate-180"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 14 10"
//                     >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M1 5h12m0 0L9 1m4 4L9 9"
//                         />
//                     </svg>
//                     <span className="sr-only">Go back</span>
//                 </button>
//             </div>
//             <div className="p-6 max-w-md mx-autoshadow-md">
//                 <div className="mb-4">
//                     <label
//                         htmlFor="address"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                         Delivery Address
//                     </label>
//                     <input
//                         type="text"
//                         id="address"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                         placeholder="1234 Main St"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="paymentMethod"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                         Payment Method
//                     </label>
//                     <select
//                         id="paymentMethod"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     >
//                         <option value="creditCard">Credit Card</option>
//                         <option value="paypal">PayPal</option>
//                         <option value="bankTransfer">Bank Transfer</option>
//                     </select>
//                 </div>

//                 <div className="mb-4 relative max-w-sm">
//                     {/* Your date picker component here */}
//                 </div>

//                 <div className="mb-4">
//                     <h2 className="text-lg font-semibold mb-2">Your Order</h2>
//                     <table className="w-full text-sm text-left text-gray-500">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2">Product</th>
//                                 <th className="px-4 py-2">Quantity</th>
//                                 <th className="px-4 py-2">Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartItems.map((item) => (
//                                 <tr key={item.id}>
//                                     <td className="px-4 py-2">{item.name}</td>
//                                     <td className="px-4 py-2">
//                                         {item.quantity}
//                                     </td>
//                                     <td className="px-4 py-2">${item.price}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div class="flex justify-center m-5">
//                     <button
//                         id="successButton"
//                         data-modal-target="successModal"
//                         data-modal-toggle="successModal"
//                         class="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                         type="button"
//                     >
//                         Show success message
//                     </button>
//                 </div>

//                 <div
//                     id="successModal"
//                     tabindex="-1"
//                     aria-hidden="true"
//                     class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
//                 >
//                     <div class="relative p-4 w-full max-w-md h-full md:h-auto">
//                         <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
//                             <button
//                                 type="button"
//                                 class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                 data-modal-toggle="successModal"
//                             >
//                                 <svg
//                                     aria-hidden="true"
//                                     class="w-5 h-5"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         fill-rule="evenodd"
//                                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                         clip-rule="evenodd"
//                                     ></path>
//                                 </svg>
//                                 <span class="sr-only">Close modal</span>
//                             </button>
//                             <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
//                                 <svg
//                                     aria-hidden="true"
//                                     class="w-8 h-8 text-green-500 dark:text-green-400"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         fill-rule="evenodd"
//                                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                         clip-rule="evenodd"
//                                     ></path>
//                                 </svg>
//                                 <span class="sr-only">Success</span>
//                             </div>
//                             <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//                                 Successfully removed product.
//                             </p>
//                             <button
//                                 data-modal-toggle="successModal"
//                                 type="button"
//                                 class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
//                             >
//                                 Continue
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                 >
//                     Submit Order
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Checkout
