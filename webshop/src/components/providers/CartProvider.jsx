import React, { createContext, useState } from "react"

// Create a context for the cart
export const CartContext = createContext()

// Create a provider component
export const CartProvider = ({ children }) => {
    // State to hold cart items
    const [cartItems, setCartItems] = useState([])

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if the item already exists
            const itemIndex = prevItems.findIndex((i) => i.id === item.id)
            if (itemIndex > -1) {
                // If exists, update the quantity
                const newItems = [...prevItems]
                newItems[itemIndex].quantity += item.quantity
                return newItems
            } else {
                // If not, add the new item
                return [...prevItems, item]
            }
        })
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
    }

    return (
        // Provide the context to children
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
