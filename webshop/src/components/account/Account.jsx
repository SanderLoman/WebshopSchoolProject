import React, { useState, useEffect, useRef, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import ThemeContext from "../providers/ThemeProvider.jsx"
import ImageCropperModal from "./image-cropper/ImageCropper.jsx"
import { initFlowbite } from "flowbite"
import Cart from "../cart/Cart.jsx"
import useAuth from "../auth/useAuth.jsx"

const Account = () => {
    const fileInputRef = useRef(null)

    const {
        lightTheme,
        systemTheme,
        setLightMode,
        setDarkMode,
        setSystemMode,
    } = useContext(ThemeContext)

    const { user, logout, updateProfile } = useAuth()

    const navigate = useNavigate()

    const [showCart, setshowCart] = useState(false)

    // States for the image cropper
    const [isCropping, setIsCropping] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [isImageUpdated, setIsImageUpdated] = useState(false)

    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        console.log("Selected file:", file)

        if (file) {
            setSelectedFile(file)
            setIsCropping(true)
        } else {
            setSelectedFile(null)
            setImagePreview(null)
        }
    }

    // This function is called when the image has been cropped
    const handleImageCropped = (croppedImageUrl) => {
        // Set the preview URL so the image can be displayed on the page
        setImagePreview(croppedImageUrl)
        console.log("Cropped image URL:", croppedImageUrl)

        // Convert the blob URL to a blob object
        fetch(croppedImageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a new file object from the blob to send to the server
                const file = new File([blob], `profile-pic-${Date.now()}.jpg`, {
                    type: "image/jpeg",
                })
                // Set the file object to the selectedFile state, so it can be uploaded
                setSelectedFile(file)
                // Indicate that cropping is done
                setIsCropping(false)
                // Set the image as updated to use the preview as the main profile picture until the server updates
                setIsImageUpdated(true)
            })
            .catch((error) => {
                console.error("Error creating file from blob URL:", error)
            })
    }

    // This function is called when the form is submitted
    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault()
        // Initialize FormData to send the file in a POST request
        const formData = new FormData()

        // Append the selected file to the FormData object
        formData.append("profilePicture", selectedFile)
        // Append other user details to the FormData object
        formData.append("email", user.email) // Assuming 'user' contains the current user's email
        formData.append(
            "firstName",
            document.getElementById("first_name").value,
        )
        formData.append("lastName", document.getElementById("last_name").value)
        formData.append("password", document.getElementById("password").value)
        formData.append(
            "confirmPassword",
            document.getElementById("confirm_password").value,
        )

        try {
            // Make a POST request to update the user profile
            const updateResponse = await fetch(
                "http://localhost:4500/api/update-profile",
                {
                    method: "POST",
                    body: formData,
                },
            )

            // Check if the request was successful
            if (!updateResponse.ok) {
                throw new Error(`HTTP error! Status: ${updateResponse.status}`)
            }

            // Fetch the updated user data from the server
            const fetchUserResponse = await fetch(
                `http://localhost:4500/api/user/${user.email}`,
            )

            if (!fetchUserResponse.ok) {
                throw new Error(
                    `Failed to fetch updated user data. Status: ${fetchUserResponse.status}`,
                )
            }

            // Get the updated user data in JSON format
            const updatedUser = await fetchUserResponse.json()
            // Update the user state with the new details
            updateProfile(updatedUser)

            // Display a success message
            toast.success("Profile updated successfully", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                className:
                    systemTheme === "dark" || systemTheme === "system"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-black",
            })

            // Update the image preview with the new profile picture URL
            setImagePreview(updatedUser.pfp)
            // Reset the image updated state to indicate that the image has been successfully uploaded
            setIsImageUpdated(false)
        } catch (error) {
            // Log and display an error if the request failed
            console.error("Error uploading file:", error)
            toast.error("Error updating profile", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                className:
                    systemTheme === "dark" || systemTheme === "system"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-black",
            })
        }
    }

    useEffect(() => {
        if (showCart) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = ""
        }
    }, [showCart])

    const navigateHome = () => {
        navigate("/")
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    const navigateToAdmin = () => {
        navigate("/admin")
    }

    const navigateToAccount = () => {
        navigate("/account")
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    useEffect(() => {
        initFlowbite()
    }, [])

    return (
        <>
            <nav className="fixed w-full bg-neutral-200 dark:bg-gray-900">
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
                            <li className="me-2 text-lg" role="presentation">
                                <button
                                    className="inline-block border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    id="profile-tab"
                                    data-tabs-target="#profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Profile
                                </button>
                            </li>
                            <li className="me-2 text-lg" role="presentation">
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
                    {/* <!-- Profile Section --> */}
                    <div
                        className="p-4 shadow-xl bg-white dark:bg-gray-800"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        {/* <!-- Profile Update Form --> */}
                        <form
                            id="profile-update-form"
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            {/* <!-- User Image --> */}
                            <div className="lg:relative bottom-16 w-max mx-auto z-10">
                                <div
                                    className="flex mx-auto justify-center drop-shadow-lg active:drop-shadow-sm border-gray-400 w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                                    onClick={() =>
                                        fileInputRef.current &&
                                        fileInputRef.current.click()
                                    }
                                >
                                    {isImageUpdated ? (
                                        <img
                                            src={imagePreview}
                                            alt="Profile"
                                            className="w-full h-full rounded-full cursor-pointer active:opacity-70"
                                        />
                                    ) : user && user.pfp ? (
                                        <img
                                            src={user.pfp}
                                            alt="Profile"
                                            className="w-full h-full rounded-full cursor-pointer active:opacity-70"
                                        />
                                    ) : (
                                        <svg
                                            className="absolute w-32 h-32 text-gray-400 -left-4 -top-4"
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
                                    {/* Trigger for Image Selection */}
                                    <div className="w-full h-full rounded-full opacity-0 cursor-pointer">
                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            className="hidden"
                                            onChange={handleFileSelect}
                                            ref={fileInputRef}
                                        />
                                    </div>
                                </div>
                                {/* <!-- User Name --> */}
                                <div className="text-center my-4">
                                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                </div>
                            </div>

                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autoComplete="first-name"
                                        placeholder={user.firstName}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autoComplete="family-name"
                                        placeholder={user.lastName}
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    autoComplete="new-password"
                                    placeholder="•••••••••"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="confirm_password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    autoComplete="new-password"
                                    placeholder="•••••••••"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-1/2 md:w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Orders Section --> */}
                    <div
                        className="hidden p-4 bg-white dark:bg-gray-800"
                        id="orders"
                        role="tabpanel"
                        aria-labelledby="orders-tab"
                    >
                        orders
                        https://flowbite.com/docs/components/tables/#table-with-products
                    </div>
                </div>
            </div>

            {/* Image Cropper Modal */}
            {isCropping && selectedFile && (
                <ImageCropperModal
                    src={URL.createObjectURL(selectedFile)}
                    onImageCropped={handleImageCropped}
                    onClose={() => setIsCropping(false)}
                />
            )}

            <Cart showCart={showCart} setshowCart={setshowCart}>
                {/* Modal Content Here */}
            </Cart>

            <ToastContainer className={"select-none"} />
        </>
    )
}

export default Account
