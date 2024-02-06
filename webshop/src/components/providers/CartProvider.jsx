import React, { createContext, useState, useContext } from "react"
import { UserContext } from "./UserContext"

// CartContext creation using React's createContext.
export const CartContext = createContext()

// CartProvider: Manages the cart items and interactions for the application.
export const CartProvider = ({ children }) => {
    // State to store cart items.
    const [cartItems, setCartItems] = useState([])

    // Using UserContext to access user information.
    const { user } = useContext(UserContext)

    // Function to add items to the cart.
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

    // Function to update the cart on the server.
    const updateCartOnServer = async (cartItems) => {
        await fetch("http://localhost:4500/api/update-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                cartItems,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error))
    }

    // Function to remove an item from the cart.
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems.filter(
                (item) => item.id !== itemId,
            )

            // Update the cart on the server after removing an item
            updateCartOnServer(updatedCartItems)
            return updatedCartItems
        })
    }

    // Function to update the quantity of an item in the cart.
    const updateItemQuantity = (itemId, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
            )
        })
    }

    // Function to clear all items from the cart.
    const clearCart = () => {
        setCartItems([])

        // Update the cart on the server after clearing.
        updateCartOnServer([])
    }

    // Context value that will be provided to descendants.
    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
    }

    // Providing the CartContext to child components.
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
