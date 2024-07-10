import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

let currentUser = null

const token = localStorage.getItem("jwtToken")
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        currentUser = { ...decodedToken, token };
    }
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(currentUser);

    const login = async (token) => {
        localStorage.setItem("jwtToken", token);
        const decodedToken = jwtDecode(token);
        setUser({ ...decodedToken, token })
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user: user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };