import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useSnackbar from '../hooks/useSnackbar';
import CustomSnackbar from '../components/CustomSnackbar';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('jwtToken');
            } else {
                setUser({ ...decodedToken, token });
            }
        }
    }, []);

    const login = async (credentials, newUser = false) => {
        try {
            const res = await axios.post(`http://localhost:5000/users/${newUser ? "signup" : "login"}`, credentials);
            if (res.data.token) {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                const decodedToken = jwtDecode(token);
                setUser({ ...decodedToken, token });
                return true
            }
        } catch (error) {
            showSnackbar(error.response.data.error, "error")
        }
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user: user, login, logout }}>
            {children}
            <CustomSnackbar snackbar={snackbar} closeSnackbar={closeSnackbar} />
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };



// import React, { createContext, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();

// let currentUser = null

// const token = localStorage.getItem("jwtToken")
// if (token) {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem("jwtToken");
//     } else {
//         currentUser = { ...decodedToken, token };
//     }
// }

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(currentUser);

//     const login = async (token) => {
//         localStorage.setItem("jwtToken", token);
//         const decodedToken = jwtDecode(token);
//         setUser({ ...decodedToken, token })
//     };

//     const logout = () => {
//         localStorage.removeItem("jwtToken");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user: user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };