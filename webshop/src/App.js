import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./components/homepage/HomePage.jsx"
import LoginPage from "./components/login/Login.jsx"
import RegisterPage from "./components/login/Register.jsx"
import AdminPage from "./components/admin/Admin.jsx"
import Account from "./components/account/Account.jsx"
import Page404 from "./components/errors/Page404.jsx"
import AccessDenied from "./components/errors/AccessDenied.jsx"
import { ThemeProvider } from "./components/providers/ThemeProvider.jsx"
import CartProvider from "./components/providers/CartProvider.jsx"
import "flowbite"
import "./App.css"

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <Router>
                    <div className="">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route
                                path="/access-denied"
                                element={<AccessDenied />}
                            />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </ThemeProvider>
    )
}

export default App
