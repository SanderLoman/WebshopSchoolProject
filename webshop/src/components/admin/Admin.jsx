import React, { useState } from "react"

const Admin = () => {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        id: "",
        name: "",
        price: "",
        imgUrl: "",
    })

    const addProduct = () => {
        setProducts([...products, newProduct])
        setNewProduct({ id: "", name: "", price: "", imgUrl: "" })
    }

    const modifyProduct = (productId) => {
    }

    const deleteProduct = (productId) => {
        setProducts(products.filter((product) => product.id !== productId))
    }

    const resetProducts = () => {
        setProducts([])
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">All Orders</h2>
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>{order}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>IMG-URL</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.imgUrl}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            modifyProduct(product.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={newProduct.id}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            id: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newProduct.name}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="IMG-URL"
                                    value={newProduct.imgUrl}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            imgUrl: e.target.value,
                                        })
                                    }
                                />
                            </td>
                            <td>
                                <button onClick={addProduct}>Add</button>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <button onClick={resetProducts} className="btn btn-danger">
                    Reset Products
                </button>
            </div>
        </div>
    )
}

export default Admin
