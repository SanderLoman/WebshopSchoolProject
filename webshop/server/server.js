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

// app.get("/api/products", (req, res) => {
//     fs.readFile(
//         path.join(__dirname, "./products.json"),
//         "utf-8",
//         (err, data) => {
//             if (err) {
//                 console.error("An error occurred:", err)
//                 res.status(500).send("Internal Server Error")
//                 return
//             }
//             const products = JSON.parse(data)
//             res.json(products.products || {})
//         },
//     )
// })

// app.get("/api/reset-products/", (req, res) => {
//     fs.readFile(
//         path.join(__dirname, "./products.json"),
//         "utf-8",
//         (err, data) => {
//             if (err) {
//                 console.error("An error occurred:", err)
//                 res.status(500).send("Internal Server Error")
//                 return
//             }
//             const products = JSON.parse(data)
//             res.json(products.reset_products || {})
//         },
//     )
// })

// app.get("/api/orders", (req, res) => {
//     fs.readFile(
//         path.join(__dirname, "./products.json"),
//         "utf-8",
//         (err, data) => {
//             if (err) {
//                 console.error("An error occurred:", err)
//                 res.status(500).send("Internal Server Error")
//                 return
//             }
//             const products = JSON.parse(data)
//             res.json(products.orders || {})
//         },
//     )
// })

app.post("/api/register", async (req, res) => {
    const { email, password, firstName, lastName, role, pfp, cart } = req.body
    try {
        const status = await registerUser(
            email,
            password,
            firstName,
            lastName,
            role,
            pfp,
            cart,
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

                const users = JSON.parse(data)
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
                })

                fs.writeFile(
                    path.join(__dirname, "./auth.json"),
                    JSON.stringify(users, null, 2),
                    (err) => {
                        if (err) {
                            console.error("An error occurred:", err)
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
