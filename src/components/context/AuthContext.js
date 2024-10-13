import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        // First, check if the credentials match the specific user
        if (username !== 'john' || password !== '123456') {
            return { success: false, error: 'Invalid username or password' };
        }

        try {
            const response = await fetch(
                'https://api-demo-4gqb.onrender.com/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                }
            );

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            setUser(data.data);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
