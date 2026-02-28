import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { FiMail, FiLock } from 'react-icons/fi'
import '../styles/auth.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            navigate('/')
        } catch (err) {
            setError('Failed to log in. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <Card className="w-full max-w-md p-8 bg-white dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                        <span className="material-icons text-2xl">login</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400">Sign in to continue your professional journey</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-center border border-red-100 dark:border-red-900/50">
                            {error}
                        </div>
                    )}

                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={FiMail}
                        required
                        className="dark:text-white"
                    />

                    <div className="space-y-1">
                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={FiLock}
                            required
                        />
                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button type="submit" fullWidth disabled={loading} className="mt-2 text-white shadow-lg shadow-primary/25">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
                    Don't have an account?
                    <Link to="/register" className="font-semibold text-primary hover:text-primary-hover ml-1 transition-colors">
                        Create account
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Login
