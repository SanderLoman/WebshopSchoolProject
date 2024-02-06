const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

// Configuration for multer to store uploaded files.
// Files are stored in the './pfp/' directory with a timestamp appended to their name.
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

// Logger middleware to log the details of incoming requests.
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})

// Serve static files from the 'pfp' directory.
app.use("/pfp", express.static(path.join(__dirname, "pfp")))

// Route to send authentication data as JSON from a file.
app.get("/api/authData", (req, res) => {
    res.sendFile(path.join(__dirname, "./auth.json"))
})

// Route to get product data from a JSON file.
app.get("/api/products", (req, res) => {
    // Read and parse the products.json file, then send the product data.
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

// Route to update the cart items for a specific user.
app.post("/api/update-cart", (req, res) => {
    // Update the cart items in the auth.json file for the given user.
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

// Route to register a new user.
app.post("/api/register", async (req, res) => {
    // Handle user registration and update the auth.json file.
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

// Route to update a user's profile, including uploading a profile picture.
app.post("/api/update-profile", upload.single("profilePicture"), (req, res) => {
    // Handle updating user's profile information.
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
                const updatedUser = users.find((user) => user.email === email)
                if (updatedUser) {
                    delete updatedUser.password
                    res.json(updatedUser)
                } else {
                    res.status(404).send("User not found after update")
                }
            },
        )
    })
})

// Route to get user information based on email.
app.get("/api/user/:email", (req, res) => {
    // Retrieve and send user data from auth.json based on email.
    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)
        const user = users.find((u) => u.email === req.params.email)

        if (user) {
            res.json(user)
        } else {
            res.status(404).send("User not found")
        }
    })
})

// Route to submit an order.
app.post("/api/submit-order", (req, res) => {
    // Handle order submission and update user's bought products.
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

        orderItems.forEach((orderedItem) => {
            const existingItemIndex = users[userIndex].boughtProducts.findIndex(
                (item) => item.id === orderedItem.id,
            )

            if (existingItemIndex >= 0) {
                users[userIndex].boughtProducts[existingItemIndex].quantity +=
                    orderedItem.quantity
            } else {
                users[userIndex].boughtProducts.push(orderedItem)
            }
        })

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

// Route to get all users' information, excluding passwords.
app.get("/api/users", (req, res) => {
    // Send all users' information except their passwords.
    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return res.status(500).send("Internal Server Error")
        }

        let users = JSON.parse(data)

        users = users.map((user) => {
            delete user.password
            return user
        })

        res.json(users)
    })
})

// Route to reset the product list to a default state.
app.post("/api/reset-products", (req, res) => {
    // Reset the product list to a predefined state.
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

// Route to delete a product by ID.
app.delete("/api/products/:id", (req, res) => {
    // Delete a product based on the provided ID.
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

            const productIndex = productsData.products.findIndex(
                (p) => p.id === productId,
            )

            if (productIndex === -1) {
                return res.status(404).send("Product not found")
            }

            productsData.products.splice(productIndex, 1)

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

// Route to add a new product.
app.post("/api/products", (req, res) => {
    // Add a new product to the product list.
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

            let ids = productsData.products
                .map((p) => p.id)
                .sort((a, b) => a - b)

            let newId = 1
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] > newId) {
                    break
                }
                newId = ids[i] + 1
            }

            const newProduct = {
                id: newId,
                name,
                price,
                imageUrl: imageUrl,
            }

            productsData.products.push(newProduct)

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

// Route to update an existing product by ID.
app.put("/api/products/:id", (req, res) => {
    // Update an existing product based on ID.
    const productId = parseInt(req.params.id)
    const updates = req.body

    fs.readFile(
        path.join(__dirname, "./products.json"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).send("Internal Server Error")
            }

            let productsData = JSON.parse(data)

            const productIndex = productsData.products.findIndex(
                (p) => p.id === productId,
            )
            if (productIndex === -1) {
                return res.status(404).send("Product not found")
            }

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

// Middleware for handling 404 (Not Found) errors.
app.use((req, res) => {
    res.status(404).send("Route not found")
})

// Function to register a user. Used in the '/api/register' route.
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
    // Handles registering a new user by updating the auth.json file.
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

// Start the server on port 4500.
app.listen(4500, () => {
    console.log("Server is running on port 4500")
})
