import React, { useContext, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Datepicker from "tailwind-datepicker-react"
import { UserContext } from "../providers/UserContext.jsx"
import { CartContext } from "../providers/CartProvider.jsx"
import "./Checkout.css"

const Checkout = () => {
    const { cartItems, clearCart, setCartItems, removeFromCart } =
        useContext(CartContext)
    const { user } = useContext(UserContext)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const datepickerRef = useRef(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function fetchCartData() {
            if (user && user.email) {
                console.log("Fetching cart data for user:", user.email)

                try {
                    const response = await fetch(
                        `http://localhost:4500/api/user/${user.email}`,
                    )
                    if (!response.ok) {
                        throw new Error("Failed to fetch cart data")
                    }
                    const userData = await response.json()
                    setCartItems(userData.cart)
                } catch (error) {
                    console.error("Error fetching cart data:", error)
                }
            }
        }

        fetchCartData()
    }, [user, user?.email])

    const navigateHome = () => {
        navigate("/")
    }

    const handleChange = (date) => {
        console.log(date)
    }

    const handleOrder = async () => {
        const orderData = {
            email: user.email,
            orderItems: cartItems,
        }

        try {
            const response = await fetch(
                "http://localhost:4500/api/submit-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                },
            )

            if (!response.ok) {
                throw new Error("Failed to submit order")
            }

            // Clear the cart in the UI
            clearCart()

            // Show success modal
            setShowModal(true)

            setTimeout(() => {
                setShowModal(false)
                navigateHome()
            }, 3000)
        } catch (error) {
            console.error("Error submitting order:", error)
            // You might also want to handle error state here
        }
    }

    // Datepicker options
    const options = {
        title: "Pick your delivery date",
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        clearBtnText: "Clear",
        minDate: new Date(),
        maxDate: new Date("2025-12-31"),
        theme: {
            background: "bg-neutral-100 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "bg-neutral-200 dark:bg-gray-800",
            icons: "bg-neutral-200 dark:bg-gray-800",
            text: "",
            disabledText: "",
            input: "",
            inputIcon: "",
            selected: "hover:bg-blue-500 dark:hover:bg-blue-500",
        },
        icons: {
            prev: () => (
                <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 19-7-7 7-7"
                    />
                </svg>
            ),
            next: () => (
                <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m9 5 7 7-7 7"
                    />
                </svg>
            ),
        },
        datepickerClassNames:
            "-top-60 flex justify-center items-center h-full w-full",
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
    }

    return (
        <div className="flex flex-col h-max md:h-screen w-screen justify-center items-center bg-neutral-200 dark:bg-gray-800 p-4">
            <div className="absolute top-4 left-4 z-50">
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
            {!showModal ? (
                <div className="relative w-full max-w-2xl mx-auto my-14">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center w-full">
                                Checkout
                            </h3>
                        </div>
                        {/* Table View */}
                        {cartItems.length > 0 ? (
                            <div className="relative overflow-y-auto h-[calc(50vh)]">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="w-1/5 px-6 py-3"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/5 px-6 py-3"
                                            >
                                                Product
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/5 px-6 py-3"
                                            >
                                                Qty
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/5 px-6 py-3"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/5 px-6 py-3"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => clearCart()}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    Remove All
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id,
                                                            )
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
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-b border-t dark:border-gray-600">
                            <tr>
                                <th scope="col" className="w-1/5 px-6 py-3">
                                    Total:
                                </th>
                                <th
                                    scope="col"
                                    className="w-1/5 px-6 py-3"
                                ></th>
                                <th
                                    scope="col"
                                    className="w-1/5 px-6 py-3"
                                ></th>
                                <th scope="col" className="w-1/5 px-6 py-3">
                                    {/* subtotal */}
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            $
                                            {cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.price *
                                                            item.quantity,
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="w-1/5 px-6 py-3"
                                ></th>
                            </tr>
                        </table>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Delivery Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="1234 Main St"
                                    required
                                />
                            </div>
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
                                    <option value="creditCard">
                                        Credit Card
                                    </option>
                                    <option value="paypal">PayPal</option>
                                    <option value="bankTransfer">Crypto</option>
                                </select>
                            </div>
                            <div className="mb-4 relative" ref={datepickerRef}>
                                <label
                                    htmlFor="datepickerId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Select Date
                                </label>
                                <div className="datepicker-container">
                                    <Datepicker
                                        options={options}
                                        onChange={handleChange}
                                        show={show}
                                        setShow={setShow}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 mt-auto">
                                <button
                                    type="submit"
                                    className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:col-span-2 ${
                                        cartItems.length > 0
                                            ? ""
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    disabled={cartItems.length === 0}
                                    onClick={handleOrder}
                                >
                                    Order now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    tabindex="-1"
                    aria-hidden="true"
                    class="mx-auto my-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
                >
                    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <button
                                type="button"
                                class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                                <span class="sr-only">Close modal</span>
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
                                Successfully removed product.
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
            )}
        </div>
    )
}

export default Checkout
