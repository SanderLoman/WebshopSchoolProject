import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/sections/hero/Hero.jsx";
import Main from "./components/sections/main/Main.jsx";
import LoginPage from "./components/login/Login.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" exact component={Hero} />
          <Route path="/main" component={Main} />
          <Route path="/login" component={LoginPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
