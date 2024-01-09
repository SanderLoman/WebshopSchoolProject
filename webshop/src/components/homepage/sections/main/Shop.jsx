import React, { useState, useEffect } from "react"

const Shop = () => {
    // const [products, setProducts] = useState([])
    // const [cart, setCart] = useState({})

    // useEffect(() => {
    //     fetch("http://localhost:4500/api/products")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const productArray = Object.values(data)
    //             setProducts(productArray)
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching products:", error)
    //         })
    // }, [])

    // const getImage = (imageName) => {
    //     switch (imageName) {
    //         case "Black Sweater":
    //             return require("../../../../assets/black_sweater.jpg")
    //         case "White Sweater":
    //             return require("../../../../assets/white_sweater.jpg")
    //         case "Jeans":
    //             return require("../../../../assets/jeans.jpg")
    //         case "Cargo Jeans":
    //             return require("../../../../assets/cargo_jeans.jpg")
    //         case "T Shirt":
    //             return require("../../../../assets/t-shirt.jpg")
    //         case "Shoes":
    //             return require("../../../../assets/shoes.jpg")
    //         default:
    //             return null
    //     }
    // }

    // const handleIncrement = (id) => {
    //     setCart((prevCart) => ({
    //         ...prevCart,
    //         [id]: (prevCart[id] || 0) + 1,
    //     }))
    // }

    // const handleDecrement = (id) => {
    //     setCart((prevCart) => ({
    //         ...prevCart,
    //         [id]: Math.max((prevCart[id] || 0) - 1, 0),
    //     }))
    // }

    return (
        <div>
            <div className="h-screen bg-gray-200 dark:bg-gray-900">shop</div>
        </div>
    )
}

export default Shop
