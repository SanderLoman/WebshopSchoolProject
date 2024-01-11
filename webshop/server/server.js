const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const multer = require("multer")

const auth = require("./auth.json")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./pfp/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    },
})

const upload = multer({ storage: storage })

const app = express()

// CORS setup, if React is on a different port
app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
})

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

app.get("/api/reset-products/", (req, res) => {
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
            res.json(products.reset_products || {})
        },
    )
})

app.get("/api/orders", (req, res) => {
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
            res.json(products.orders || {})
        },
    )
})

app.post("/api/register", async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body
    try {
        const status = await registerUser(
            email,
            password,
            firstName,
            lastName,
            role,
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

// For handling not found routes
app.use((req, res) => {
    res.status(404).send("Route not found")
})

const registerUser = (email, password, firstName, lastName, role) => {
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

                users.push({ email, password, firstName, lastName, role })

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

app.post(
    "/api/upload-profile-picture",
    upload.single("profilePicture"),
    (req, res) => {
        // Check if the email is provided
        if (!req.body.email) {
            return res.status(400).send("Email is required.")
        }

        if (!req.file) {
            return res.status(400).send("No file uploaded.")
        }

        const filePath = req.file.path

        fs.readFile(
            path.join(__dirname, "./auth.json"),
            "utf-8",
            (err, data) => {
                if (err) {
                    console.error("An error occurred:", err)
                    return res.status(500).send("Internal Server Error")
                }

                const users = JSON.parse(data)
                const userIndex = users.findIndex(
                    (user) => user.email === req.body.email,
                )

                if (userIndex !== -1) {
                    users[userIndex].pfp = filePath

                    fs.writeFile(
                        path.join(__dirname, "./auth.json"),
                        JSON.stringify(users, null, 2),
                        (err) => {
                            if (err) {
                                console.error("An error occurred:", err)
                                return res
                                    .status(500)
                                    .send("Internal Server Error")
                            }

                            res.send(
                                "File uploaded and path updated successfully",
                            )
                        },
                    )
                } else {
                    res.status(404).send("User not found")
                }
            },
        )
    },
)

// Start the server
app.listen(4500, () => {
    console.log("Server is running on port 4500")
})
