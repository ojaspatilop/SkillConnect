import React, { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('skillconnect_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const userData = await authService.login({ email, password })
            setUser(userData)
            return userData
        } catch (error) {
            throw error
        }
    }

    const register = async (name, email, password) => {
        try {
            const userData = await authService.register({ name, email, password })
            setUser(userData)
            return userData
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        authService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
