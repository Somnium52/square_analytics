import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [token, setToken] = useState(() => localStorage.getItem('access_token') || null)
    const [user, setUser] = useState(null)

    const isAuthenticated = !!token

    const login = (newToken, userData = null) =>{
        localStorage.setItem("access_token", newToken)
        setToken(newToken)
        if (userData){
            setUser(userData)
        }
    }

    const logout = () =>{
        localStorage.removeItem("access_token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )   
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be into AuthProvider")
    }
    return context
}