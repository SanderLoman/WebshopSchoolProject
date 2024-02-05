const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./pfp/"),
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const baseName = path.basename(file.originalname, fileExt)
        cb(null, `${baseName}-${Date.now()}`)
    },
})

const upload = multer({ storage: storage })

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})

app.use("/pfp", express.static(path.join(__dirname, "pfp")))

app.get("/api/authData", (req, res) => {
    res.sendFile(path.join(__dirname, "./auth.json"))
})

app.get("/api/products", (req, res) => {
    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("An error occurred:", err)
                res.status(500).send("Internal Server Error")
                return
            }
            const products = JSON.parse(data)
            res.json(products.products || {})
        },
    )
})

app.post("/api/update-cart", (req, res) => {
    const { email, cartItems } = req.body

    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        const userIndex = users.findIndex((user) => user.email === email)

        if (userIndex === -1) {
            return res.status(404).send("User not found")
        }

        // Update the user's cart
        users[userIndex].cart = cartItems

        fs.writeFile(
            path.join(__dirname, "./auth.json"),
            JSON.stringify(users, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error("An error occurred:", writeErr)
                    return res.status(500).send("Internal Server Error")
                }
                res.status(200).json({ message: "Cart updated successfully" })
            },
        )
    })
})

app.post("/api/register", async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        role,
        pfp,
        cart,
        boughtProducts,
    } = req.body
    try {
        const status = await registerUser(
            email,
            password,
            firstName,
            lastName,
            role,
            pfp,
            cart,
            boughtProducts,
        )
        if (status.success) {
            res.status(201).json({ message: "User successfully registered" })
        } else {
            res.status(409).json({ message: "User already exists" })
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during registration.",
        })
    }
})

app.post("/api/update-profile", upload.single("profilePicture"), (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body
    const file = req.file

    if (!email) {
        return res.status(400).send("Email is required.")
    }

    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        const userIndex = users.findIndex((user) => user.email === email)

        if (userIndex === -1) {
            return res.status(404).send("User not found")
        }

        // Update fields only if they are provided
        if (firstName) users[userIndex].firstName = firstName
        if (lastName) users[userIndex].lastName = lastName

        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).send("Passwords do not match")
            }
            users[userIndex].password = password
        }

        if (file) {
            const originalExt = path.extname(file.originalname)
            const newFilename = file.filename + originalExt
            const newPath = path.join(file.destination, newFilename)

            fs.renameSync(file.path, newPath)

            // Create an absolute URL
            const imageURL = `${req.protocol}://${req.get("host")}/pfp/${
                file.filename
            }${originalExt}`
            users[userIndex].pfp = imageURL
        }

        fs.writeFile(
            path.join(__dirname, "./auth.json"),
            JSON.stringify(users, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error("An error occurred:", writeErr)
                    return res.status(500).send("Internal Server Error")
                }
                // Find and send back the updated user data
                const updatedUser = users.find((user) => user.email === email)
                if (updatedUser) {
                    // Remove sensitive data before sending back to client
                    delete updatedUser.password
                    // Send back the updated user data
                    res.json(updatedUser)
                } else {
                    res.status(404).send("User not found after update")
                }
            },
        )
    })
})

app.get("/api/user/:email", (req, res) => {
    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        const user = users.find((u) => u.email === req.params.email)

        if (user) {
            // delete user.password
            res.json(user)
        } else {
            res.status(404).send("User not found")
        }
    })
})

app.post("/api/submit-order", (req, res) => {
    const { email, orderItems } = req.body

    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        const userIndex = users.findIndex((user) => user.email === email)

        if (userIndex === -1) {
            return res.status(404).send("User not found")
        }

        // Update or add the order items in boughtProducts
        orderItems.forEach((orderedItem) => {
            const existingItemIndex = users[userIndex].boughtProducts.findIndex(
                (item) => item.id === orderedItem.id,
            )

            if (existingItemIndex >= 0) {
                // Update quantity if item already exists
                users[userIndex].boughtProducts[existingItemIndex].quantity +=
                    orderedItem.quantity
            } else {
                // Add new item if it doesn't exist
                users[userIndex].boughtProducts.push(orderedItem)
            }
        })

        // Clear the user's cart
        users[userIndex].cart = []

        fs.writeFile(
            path.join(__dirname, "./auth.json"),
            JSON.stringify(users, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error("An error occurred:", writeErr)
                    return res.status(500).send("Internal Server Error")
                }
                res.status(200).json({
                    message: "Order submitted successfully",
                })
            },
        )
    })
})

app.get("/api/users", (req, res) => {
    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        // You might want to remove sensitive information like passwords
        users = users.map((user) => {
            delete user.password
            return user
        })

        res.json(users)
    })
})

app.post("/api/reset-products", (req, res) => {
    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("An error occurred:", err)
                return res.status(500).send("Internal Server Error")
            }
            const jsonData = JSON.parse(data)
            const resetProducts = jsonData["reset-products"]

            // Overwriting the 'products' key with 'reset-products'
            jsonData.products = resetProducts

            fs.writeFile(
                path.join(__dirname, "./products.json"),
                JSON.stringify(jsonData, null, 2),
                (writeErr) => {
                    if (writeErr) {
                        console.error("An error occurred:", writeErr)
                        return res.status(500).send("Internal Server Error")
                    }
                    res.json({
                        success: true,
                        products: resetProducts,
                        message: "Products reset successfully",
                    })
                },
            )
        },
    )
})

app.delete("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)

    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).send("Internal Server Error")
            }

            let productsData = JSON.parse(data)

            // Find the index of the product to be deleted
            const productIndex = productsData.products.findIndex(
                (p) => p.id === productId,
            )

            if (productIndex === -1) {
                return res.status(404).send("Product not found")
            }

            // Remove the product from the array
            productsData.products.splice(productIndex, 1)

            // Write the updated products array back to the file
            fs.writeFile(
                path.join(__dirname, "./products.json"),
                JSON.stringify(productsData, null, 2),
                (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing file:", writeErr)
                        return res.status(500).send("Internal Server Error")
                    }
                    res.status(200).send("Product deleted successfully")
                },
            )
        },
    )
})

// POST route to add a new product
app.post("/api/products", (req, res) => {
    const { name, price, imageUrl } = req.body

    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).send("Internal Server Error")
            }

            let productsData = JSON.parse(data)

            // Sort existing product IDs
            let ids = productsData.products
                .map((p) => p.id)
                .sort((a, b) => a - b)

            // Find the first available ID
            let newId = 1
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] > newId) {
                    break
                }
                newId = ids[i] + 1
            }

            // Create a new product object
            const newProduct = {
                id: newId,
                name,
                price,
                imageUrl: imageUrl,
            }

            // Add the new product
            productsData.products.push(newProduct)

            // Write the updated products array back to the file
            fs.writeFile(
                path.join(__dirname, "./products.json"),
                JSON.stringify(productsData, null, 2),
                (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing file:", writeErr)
                        return res.status(500).send("Internal Server Error")
                    }
                    res.status(201).json(newProduct)
                },
            )
        },
    )
})

app.put("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const updates = req.body // This now contains only the updated fields

    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).send("Internal Server Error")
            }

            let productsData = JSON.parse(data)

            // Find the product and update it
            const productIndex = productsData.products.findIndex(
                (p) => p.id === productId,
            )
            if (productIndex === -1) {
                return res.status(404).send("Product not found")
            }

            // Update only the provided fields
            productsData.products[productIndex] = {
                ...productsData.products[productIndex],
                ...updates,
            }

            fs.writeFile(
                path.join(__dirname, "./products.json"),
                JSON.stringify(productsData, null, 2),
                (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing file:", writeErr)
                        return res.status(500).send("Internal Server Error")
                    }
                    res.status(200).json(productsData.products[productIndex])
                },
            )
        },
    )
})

// For handling not found routes
app.use((req, res) => {
    res.status(404).send("Route not found")
})

const registerUser = (
    email,
    password,
    firstName,
    lastName,
    role,
    pfp,
    cart,
    boughtProducts,
) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, "./auth.json"),
            "utf-8",
            (err, data) => {
                if (err) {
                    console.error("An error occurred:", err)
                    reject({ message: "An error occurred" })
                    return
                }

                let users = JSON.parse(data)
                const existingUser = users.find((user) => user.email === email)

                if (existingUser) {
                    resolve({ message: "User already exists", success: false })
                    return
                }

                // Add a new user with bought-products as an empty array
                users.push({
                    email,
                    password,
                    firstName,
                    lastName,
                    role,
                    pfp,
                    cart,
                    boughtProducts,
                })

                fs.writeFile(
                    path.join(__dirname, "./auth.json"),
                    JSON.stringify(users, null, 2),
                    (writeErr) => {
                        if (writeErr) {
                            console.error("An error occurred:", writeErr)
                            reject({ message: "An error occurred" })
                            return
                        }
                        resolve({
                            message: "User successfully registered",
                            success: true,
                        })
                    },
                )
            },
        )
    })
}

// Start the server
app.listen(4500, () => {
    console.log("Server is running on port 4500")
})
