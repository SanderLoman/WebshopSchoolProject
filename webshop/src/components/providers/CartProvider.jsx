import React, { createContext, useState, useEffect } from "react"
import useAuth from "../auth/useAuth"

// Create a context for the cart
export const CartContext = createContext()

// Create a provider component
export const CartProvider = ({ children }) => {
    // State to hold cart items
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
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId),
        )
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

    // The value that will be supplied to any descendants of this provider
    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        updateCartFromAuth, // Add this function to your context
    }

    useEffect(() => {
        if (user) {
            // Assuming `user` has a `cart` property that contains the cart items
            setCartItems(user.cart)
        }
    }, [user])

    return (
        // Provide the context to children
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
