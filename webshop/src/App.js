import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./components/homepage/HomePage.jsx"
import LoginPage from "./components/login/Login.jsx"
import RegisterPage from "./components/login/Register.jsx"
import AdminPage from "./components/admin/Admin.jsx"
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx"
import "./App.css"

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
