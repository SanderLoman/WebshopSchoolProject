import React from "react";
import useAuth from "../auth/useAuth.jsx";
import "./Login.css";

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Replace with your actual form values
    login("username", "password");
  };

  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
