import { useState } from "react";
import "./useAuth.css";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Fetch the JSON file and simulate authentication
    fetch("./json/auth.json")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find(
          (u) => u.username === username && u.password === password
        );
        if (foundUser) {
          setUser(foundUser);
        }
      });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
