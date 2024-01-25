import React, { createContext, useState, useEffect } from "react"
import useAuth from "../auth/useAuth"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const updateCartFromAuth = (cartFromAuth) => {
        setCartItems(cartFromAuth)
    }

    const { user } = useAuth(updateCartFromAuth)

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            let newCartItems
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id,
            )

            if (existingItemIndex > -1) {
                // Update quantity for existing product
                newCartItems = prevItems.map((i, index) =>
                    index === existingItemIndex
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i,
                )
            } else {
                // Add new product to cart
                newCartItems = [...prevItems, item]
            }

            // Send the updated cart to the server
            updateCartOnServer(newCartItems)
            return newCartItems
        })
    }

    const updateCartOnServer = async (cartItems) => {
        await fetch("http://localhost:4500/api/update-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email, // Ensure 'user.email' is correctly sourced from your user state or context
                cartItems,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error))
    }

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems.filter(
                (item) => item.id !== itemId,
            )
            updateCartOnServer(updatedCartItems) // Update the cart on the server after removing an item
            return updatedCartItems
        })
    }

    // Function to update the quantity of an item in the cart
    const updateItemQuantity = (itemId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
            )
        })
    }

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([])
    }

    useEffect(() => {
        const fetchCartData = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(
                        `http://localhost:4500/api/user/${user.email}`,
                    )
                    const userData = await response.json()
                    if (response.ok) {
                        setCartItems(userData.cart || [])
                    } else {
                        throw new Error("Failed to fetch cart data")
                    }
                } catch (error) {
                    console.error("Error fetching cart data:", error)
                }
            }
        }

        fetchCartData()
    }, [user])

    // The value that will be supplied to any descendants of this provider
    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        updateCartFromAuth,
    }

    return (
        // Provide the context to children
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
