import React, { useEffect, useContext, useState } from "react"
import { UserContext } from "../providers/UserContext.jsx"
import ThemeContext from "../providers/ThemeProvider.jsx"
import { CartContext } from "../providers/CartProvider.jsx"
import Cart from "../cart/Cart.jsx"
import { useNavigate } from "react-router-dom"
import { initFlowbite } from "flowbite"
import { ToastContainer } from "react-toastify"
import DeleteModal from "./modals/DeleteModal.jsx"
import EditModal from "./modals/EditModal.jsx"
import AddModal from "./modals/AddModal.jsx"
import "react-toastify/dist/ReactToastify.css"
import "./Admin.css"

const Admin = () => {
    const { cartItems, setCartItems, clearCart, removeFromCart } =
        useContext(CartContext)
    const {
        lightTheme,
        systemTheme,
        setLightMode,
        setDarkMode,
        setSystemMode,
    } = useContext(ThemeContext)
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [showCart, setshowCart] = useState(false)

    const [orders, setOrders] = useState([])

    const [products, setProducts] = useState([])

    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState(null)

    const [isAddModalOpen, setisAddModalOpen] = useState(false)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editProduct, setEditProduct] = useState(null)

    useEffect(() => {
        if (user && user.role === "admin") {
            fetch("http://localhost:4500/api/users")
                .then((res) => res.json())
                .then((users) => {
                    // Create a map to hold the sum of quantities for each product
                    const productMap = new Map()

                    // Aggregate all boughtProducts from each user
                    users.forEach((user) => {
                        user.boughtProducts.forEach((product) => {
                            if (productMap.has(product.id)) {
                                productMap.get(product.id).quantity +=
                                    product.quantity
                            } else {
                                productMap.set(product.id, { ...product })
                            }
                        })
                    })

                    // Convert the map back into an array
                    const aggregatedProducts = Array.from(productMap.values())

                    setOrders(aggregatedProducts)
                })
                .catch((err) => {
                    console.error("Failed to fetch user data:", err)
                })
        } else {
            navigate("/access-denied")
        }
    }, [user, navigate])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4500/api/products",
                )
                const data = await response.json()
                console.log("Data:", data)
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

    const navigateHome = () => {
        navigate("/")
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const navigateToAdmin = () => {
        navigate("/admin")
    }

    const navigateToAccount = () => {
        navigate("/account")
    }

    const handleAddProduct = async (productData) => {
        try {
            const response = await fetch("http://localhost:4500/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            })
            const data = await response.json()
            if (response.ok) {
                setProducts([...products, data]) // Update local state
                setisAddModalOpen(false) // Close the modal
            } else {
                console.error("Failed to add product:", data)
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error("Error adding product:", error)
            // Optionally show an error message to the user
        }
    }

    const handleEditClick = (product) => {
        setEditProduct(product)
        setIsEditModalOpen(true)
    }

    const handleEditProduct = async (updatedProduct) => {
        try {
            const response = await fetch(
                `http://localhost:4500/api/products/${updatedProduct.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProduct),
                },
            )
            const data = await response.json()
            if (response.ok) {
                // Update the products state with the updated product
                setProducts(
                    products.map((p) =>
                        p.id === updatedProduct.id ? data : p,
                    ),
                )
                setIsEditModalOpen(false) // Close the modal
            } else {
                console.error("Failed to update product:", data)
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error("Error updating product:", error)
            // Optionally show an error message to the user
        }
    }

    const handleDeleteClick = (productId) => {
        setDeleteProductId(productId)
        setisDeleteModalOpen(true)
    }

    const handleDeleteProduct = async () => {
        await fetch(`http://localhost:4500/api/products/${deleteProductId}`, {
            method: "DELETE",
        })
        setProducts(
            products.filter((product) => product.id !== deleteProductId),
        )
    }

    const handleResetProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:4500/api/reset-products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            const data = await response.json()
            if (data.success) {
                setProducts(data.products)
                console.log("Products reset successfully")
            } else {
                console.error("Failed to reset products:", data.message)
            }
        } catch (error) {
            console.error("Error resetting products:", error)
        }
    }

    useEffect(() => {
        initFlowbite()
    }, [])

    return (
        <>
            <nav className="fixed w-full bg-neutral-200 dark:bg-gray-900 z-10">
                <div className="max-w-screen-xl flex md:flex-wrap items-center md:justify-between mx-auto p-4">
                    <div className="xl:absolute top-4 left-4 w-1/3">
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
                    <p className="xl:flex items-center hidden md:w-1/3 select-none self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Webshop
                    </p>
                    <div className="block w-1/2 md:w-1/3">
                        <ul
                            className="flex flex-wrap justify-around -mb-px text-sm font-medium text-center"
                            id="default-tab"
                            data-tabs-toggle="#default-tab-content"
                            role="tablist"
                        >
                            <li className="me-2 text-md" role="presentation">
                                <button
                                    className="inline-block border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    id="products-tab"
                                    data-tabs-target="#products"
                                    type="button"
                                    role="tab"
                                    aria-controls="products"
                                    aria-selected="false"
                                >
                                    products
                                </button>
                            </li>
                            <li className="me-2 text-md" role="presentation">
                                <button
                                    className="inline-block border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    id="orders-tab"
                                    data-tabs-target="#orders"
                                    type="button"
                                    role="tab"
                                    aria-controls="orders"
                                    aria-selected="false"
                                >
                                    Orders
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <div
                            className="relative w-10 h-10 overflow-hidden cursor-pointer bg-white rounded-full dark:bg-gray-600 shadow-md active:shadow-sm"
                            id="avatarButton"
                            type="button"
                            data-dropdown-toggle="userDropdown"
                            data-dropdown-placement="bottom-start"
                            alt="User dropdown"
                        >
                            {user && user.pfp ? (
                                <img
                                    src={user.pfp}
                                    alt="User"
                                    className="w-full h-full rounded-full"
                                />
                            ) : (
                                <svg
                                    className="absolute w-12 h-12 text-gray-400 -left-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </div>

                        {/* <!-- Dropdown menu --> */}
                        <div
                            id="userDropdown"
                            className="hidden bg-white divide-y divide-gray-100 shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 select-none"
                        >
                            {user && (
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{`${user.firstName} ${user.lastName}`}</div>
                                    <div className="font-medium truncate">
                                        {user.email}
                                    </div>
                                </div>
                            )}

                            <ul
                                className="text-sm text-gray-700 dark:text-zinc-200"
                                aria-labelledby="avatarButton"
                            >
                                {user && (
                                    <>
                                        {user.role === "admin" && (
                                            <li>
                                                <button
                                                    className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={navigateToAdmin}
                                                >
                                                    Admin
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={navigateToAccount}
                                            >
                                                Account
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() =>
                                                    setshowCart(true)
                                                }
                                            >
                                                Cart
                                            </button>
                                        </li>
                                    </>
                                )}

                                <li>
                                    <div aria-labelledby="dropdownNavbarLink">
                                        <button
                                            id="doubleDropdownButton"
                                            data-dropdown-toggle="doubleDropdown"
                                            data-dropdown-placement="right-start"
                                            type="button"
                                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Themes
                                            <svg
                                                className="w-2.5 h-2.5 ml-2.5"
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
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>
                                        <div
                                            id="doubleDropdown"
                                            className="hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
                                        >
                                            <ul
                                                className="text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="doubleDropdownButton"
                                            >
                                                <li>
                                                    <button
                                                        id="system"
                                                        className={`block text-left px-4 py-2 w-full ${
                                                            systemTheme ===
                                                            "system"
                                                                ? "bg-zinc-300 dark:bg-gray-600"
                                                                : ""
                                                        } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                        onClick={setSystemMode}
                                                    >
                                                        System
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        id="light"
                                                        className={`block text-left px-4 py-2 w-full ${
                                                            lightTheme ===
                                                            "light"
                                                                ? "bg-zinc-300 dark:bg-gray-600"
                                                                : ""
                                                        } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                        onClick={setLightMode}
                                                    >
                                                        Light
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        id="dark"
                                                        className={`block text-left px-4 py-2 w-full ${
                                                            systemTheme ===
                                                            "dark"
                                                                ? "bg-zinc-300 dark:bg-gray-600"
                                                                : ""
                                                        } hover:bg-zinc-200 dark:hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white`}
                                                        onClick={setDarkMode}
                                                    >
                                                        Dark
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                ) : (
                                    <button
                                        onClick={navigateToLogin}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-zinc-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign in
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* main div */}
            <div className="flex justify-center items-center h-screen w-screen shadow-sm-light bg-neutral-200 dark:bg-gray-900">
                <div
                    id="default-tab-content"
                    className="container h-2/3 md:h-auto"
                >
                    {/* <!-- Products Section --> */}
                    <div
                        className="hidden px-4 xl:w-1/2 md:mx-auto"
                        id="products"
                        role="tabpanel"
                        aria-labelledby="products-tab"
                    >
                        {products && (
                            <div className="flex justify-center items-center flex-col">
                                <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 flex items-start justify-between p-4 border-b rounded-t-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center w-full h-8">
                                        Products overview
                                    </h3>
                                </div>
                                <div className="relative overflow-y-auto w-full bg-white h-[calc(50vh)]">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-4 py-3"
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Product
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td className="p-4 flex justify-center text-center">
                                                        {item.imageUrl ? (
                                                            <img
                                                                src={
                                                                    item.imageUrl
                                                                }
                                                                alt={item.name}
                                                                className="w-20 h-20 object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-gray-500 dark:text-gray-300 w-20 h-20 flex justify-center items-center">
                                                                No Image Found
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </td>
                                                    <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        ${item.price.toFixed(2)}
                                                    </td>
                                                    <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white space-x-4">
                                                        <button
                                                            className="text-blue-500"
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-red-500"
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <table className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 w-full text-left dark:text-gray-400 border-t dark:border-gray-600 rounded-b-lg h-16">
                                    <tbody>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center w-1/4 px-4 py-3"
                                            >
                                                <div className="flex justify-center items-center w-full">
                                                    <button
                                                        className="text-blue-500 flex justify-center items-center"
                                                        onClick={() =>
                                                            setisAddModalOpen(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <span className="mr-2">
                                                            Add A Product
                                                        </span>
                                                        <svg
                                                            className="w-0 h-0 md:w-4 md:h-4 text-blue-500"
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
                                                                d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            >
                                                <div className="flex justify-center items-center w-full">
                                                    <button
                                                        onClick={
                                                            handleResetProducts
                                                        }
                                                        className="text-emerald-500 flex justify-center items-center"
                                                    >
                                                        <span className="mr-2">
                                                            Reset Products
                                                        </span>
                                                        <svg
                                                            className="md:w-4 md:h-4 text-emerald-500"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 18"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* <!-- Orders Section --> */}
                    <div
                        className="hidden p-4 xl:w-1/2 md:mx-auto"
                        id="orders"
                        role="tabpanel"
                        aria-labelledby="orders-tab"
                    >
                        {orders && orders.length > 0 ? (
                            <>
                                <div className="bg-white dark:bg-gray-800 dark:border-gray-700 flex items-start justify-between p-4 border-b rounded-t-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center w-full h-8">
                                        All previous orders
                                    </h3>
                                </div>
                                <div className="relative overflow-y-auto bg-white dark:bg-gray-800 h-[calc(50vh)]">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-4 py-3"
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Product
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Qty
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-center w-1/4 px-6 py-3"
                                                >
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td className="p-4 flex justify-center text-center">
                                                        {item.imageUrl ? (
                                                            <img
                                                                src={
                                                                    item.imageUrl
                                                                }
                                                                alt={item.name}
                                                                className="w-20 h-20 object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-gray-500 w-20 h-20 flex justify-center items-center">
                                                                No Image Found
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </td>
                                                    <td className="text-center px-6 py-4">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        $
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <table className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 w-full text-left dark:text-gray-400 border-t dark:border-gray-600 rounded-b-lg h-16">
                                    <tbody>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center w-1/4 px-4 py-3"
                                            >
                                                Total:
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            ></th>
                                            <th
                                                scope="col"
                                                className="w-1/4 px-6 py-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-900 dark:text-white w-full text-center">
                                                        $
                                                        {orders
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
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <div className="text-center py-6 h-[calc(50vh)]">
                                <p className="flex justify-center items-center h-full text-lg text-gray-700 dark:text-gray-300">
                                    You don't have any orders yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                setIsOpen={setisDeleteModalOpen}
                onDelete={handleDeleteProduct}
                productId={deleteProductId}
            />

            <EditModal
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                onEdit={handleEditProduct}
                product={editProduct}
            />

            <AddModal
                isOpen={isAddModalOpen}
                setIsOpen={setisAddModalOpen}
                onAdd={handleAddProduct}
            />

            <Cart showCart={showCart} setshowCart={setshowCart} />

            <ToastContainer className={"select-none"} />
        </>
    )
}

export default Admin
