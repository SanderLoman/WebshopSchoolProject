import React, { useState, useEffect } from "react"

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    useEffect(() => {
        fetch("http://localhost:4500/api/products")
            .then((response) => response.json())
            .then((data) => {
                const productArray = Object.values(data)
                setProducts(productArray)
            })
            .catch((error) => {
                console.error("Error fetching products:", error)
            })
    }, [])

    const getImage = (imageName) => {
        switch (imageName) {
            case "Black Sweater":
                return require("../../../../assets/black_sweater.jpg")
            case "White Sweater":
                return require("../../../../assets/white_sweater.jpg")
            case "Jeans":
                return require("../../../../assets/jeans.jpg")
            case "Cargo Jeans":
                return require("../../../../assets/cargo_jeans.jpg")
            case "T Shirt":
                return require("../../../../assets/t-shirt.jpg")
            case "Shoes":
                return require("../../../../assets/shoes.jpg")
            default:
                return null
        }
    }

    const handleIncrement = (id) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: (prevCart[id] || 0) + 1,
        }))
    }

    const handleDecrement = (id) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: Math.max((prevCart[id] || 0) - 1, 0),
        }))
    }

    return (
        <div className="flex justify-center p-4 h-max lg:h-screen bg-gray-100 dark:bg-[#1d242c]">
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center justify-between p-4 m-4 bg-white dark:bg-[#1d242c] dark:shadow-gray-900 rounded-xl shadow-xl hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={getImage(product.name)}
                            alt={product.name}
                            style={{ height: "250px" }}
                        />

                        <div className="text-lg font-semibold">
                            {product.name}
                        </div>
                        <div className="text-md text-gray-600">
                            Price: ${product.prijs}
                        </div>
                        <div className="flex justify-center items-center mt-2 w-full">
                            <button
                                onClick={() => handleDecrement(product.id)}
                                className="text-white px-2 py-1 rounded-lg w-1/3 text-end"
                            >
                                -
                            </button>
                            <div className="mx-2 w-1/3 text-center">
                                {cart[product.id] || 0}
                            </div>
                            <button
                                onClick={() => handleIncrement(product.id)}
                                className="text-white px-2 py-1 rounded-lg w-1/3 text-start"
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop
