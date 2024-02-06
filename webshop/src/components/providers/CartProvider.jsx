import React, { createContext, useState, useContext } from "react"
import { UserContext } from "./UserContext"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const { user } = useContext(UserContext)

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
                email: user.email,
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

        updateCartOnServer([])
    }

    // The value that will be supplied to any descendants of this provider
    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
    }

    return (
        // Provide the context to children
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
