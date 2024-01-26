import React, { createContext, useState, useEffect } from "react"
import useAuth from "../auth/useAuth"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const updateCartFromAuth = (cartFromAuth) => {
        // Temp
        console.log("Cart updated from auth:", cartFromAuth)

        setCartItems(cartFromAuth)
    }

    const { user } = useAuth(updateCartFromAuth)

    const addToCart = (item) => {
        // Temp
        console.log("Before adding to cart, cartItems:", cartItems)
        console.log("Adding to cart:", item)

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

            // Temp
            console.log("After adding to cart, newCartItems:", newCartItems)

            // Send the updated cart to the server
            updateCartOnServer(newCartItems)
            return newCartItems
        })
    }

    const updateCartOnServer = async (cartItems) => {
        // Temp
        console.log("Updating cart on server with items:", cartItems)

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
            .then((data) => console.log("Fetched data:", data))
            .catch((error) => console.error("Error:", error))
    }

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        // Temp
        console.log("Removing item from cart, itemId:", itemId)

        setCartItems((prevItems) => {
            const updatedCartItems = prevItems.filter(
                (item) => item.id !== itemId,
            )
            // Temp
            console.log("After removing, updatedCartItems:", updatedCartItems)

            updateCartOnServer(updatedCartItems) // Update the cart on the server after removing an item
            return updatedCartItems
        })
    }

    // Function to update the quantity of an item in the cart
    const updateItemQuantity = (itemId, quantity) => {
        // Temp
        console.log(
            `Updating item quantity, itemId: ${itemId}, quantity: ${quantity}`,
        )

        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item,
            )
        })
    }

    // Function to clear the cart
    const clearCart = () => {
        // Temp
        console.log("Clearing cart")

        setCartItems([])
    }

    useEffect(() => {
        async function fetchCartData() {
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
                    setCartItems(userData.cart)
                } catch (error) {
                    console.error("Error fetching cart data:", error)
                }
            }
        }

        fetchCartData()
    }, [user?.email, setCartItems]) // Added setCartItems to dependency array as a best practice

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
