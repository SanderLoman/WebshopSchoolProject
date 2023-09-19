const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const auth = require("./auth.json")

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

app.post("/api/register", (req, res) => {
    const { email, password, firstName, lastName, role } = req.body
    registerUser(email, password, firstName, lastName, role)
    res.send("User registered")
})

// For handling not found routes
app.use((req, res) => {
    res.status(404).send("Route not found")
})

const registerUser = (email, password, firstName, lastName, role) => {
    // Read the existing users from the file
    fs.readFile(path.join(__dirname, "./auth.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("An error occurred:", err)
            return
        }

        const users = JSON.parse(data)

        // Check if user already exists
        const existingUser = users.find((user) => user.email === email)
        if (existingUser) {
            console.log("User already exists")
            return
        }

        // Add the new user
        users.push({ email, password, firstName, lastName, role })

        // Write the updated user list back to the file
        fs.writeFile(
            path.join(__dirname, "./auth.json"),
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    console.error("An error occurred:", err)
                    return
                }
                console.log("User successfully registered")
            },
        )
    })
}

// Start the server
app.listen(4500, () => {
    console.log("Server is running on port 4500")
})
