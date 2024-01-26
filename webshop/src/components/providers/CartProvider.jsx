import React, { createContext, useState, useEffect } from "react"
import useAuth from "../auth/useAuth"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const { user } = useAuth()

    // Helper function to manage local storage
    const saveCartToLocalStorage = (items) => {
        if (user?.email) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(items))
        }
    }

    useEffect(() => {
        // Load or clear cart items depending on the user state
        if (user?.email) {
            const localCartData = localStorage.getItem(`cart_${user.email}`)
            if (localCartData) {
                setCartItems(JSON.parse(localCartData))
            } else {
                fetchCartData()
            }
        } else {
            setCartItems([])
        }
    }, [user])

    // Fetch cart data from the server
    const fetchCartData = async () => {
        if (user?.email) {
            console.log("Fetching cart data for user:", user.email)
            try {
                const response = await fetch(
                    `http://localhost:4500/api/user/${user.email}`,
                )
                if (!response.ok) {
                    throw new Error("Failed to fetch cart data")
                }
                const userData = await response.json()
                setCartItems(userData.cart || [])
                saveCartToLocalStorage(userData.cart || [])
            } catch (error) {
                console.error("Error fetching cart data:", error)
            }
        }
    }

    // Update cart on server and in local storage
    useEffect(() => {
        updateCartOnServer(cartItems)
    }, [cartItems])

    // Function to add item to cart
    const addToCart = (newItem) => {
        setCartItems((currentItems) => {
            const itemIndex = currentItems.findIndex(
                (item) => item.id === newItem.id,
            )
            let newCart = []

            if (itemIndex > -1) {
                newCart = currentItems.map((item) =>
                    item.id === newItem.id
                        ? {
                              ...item,
                              quantity: item.quantity + newItem.quantity,
                          }
                        : item,
                )
            } else {
                newCart = [...currentItems, { ...newItem, quantity: 1 }]
            }

            return newCart
        })
    }

    // Function to remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((currentItems) => {
            const newCart = currentItems.filter((item) => item.id !== itemId)
            return newCart
        })
    }

    // Function to update item quantity in the cart
    const updateItemQuantity = (itemId, quantity) => {
        setCartItems((currentItems) => {
            const newCart = currentItems.map((item) =>
                item.id === itemId ? { ...item, quantity: quantity } : item,
            )
            return newCart
        })
    }

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([])
        if (user?.email) {
            localStorage.removeItem(`cart_${user.email}`)
        }
    }

    // Function to update cart on the server
    const updateCartOnServer = async (newCartItems) => {
        // Update the server with new cart data
        if (user?.email) {
            try {
                const response = await fetch(
                    "http://localhost:4500/api/update-cart",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: user.email,
                            cartItems: newCartItems,
                        }),
                    },
                )
                if (!response.ok) {
                    throw new Error("Failed to update cart on server")
                }
                await response.json()
            } catch (error) {
                console.error("Error updating cart on server:", error)
            }
        }
    }

    // Make sure to call updateCartOnServer whenever the cart is modified
    useEffect(() => {
        updateCartOnServer(cartItems)
    }, [cartItems])

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
