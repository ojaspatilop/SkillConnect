import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import '../styles/auth.css'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register(name, email, password)
            navigate('/')
        } catch (err) {
            setError(err.message || 'Failed to create account.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <Card className="w-full max-w-md p-8 bg-white dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                        <span className="material-icons text-2xl">person_add</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-slate-500 dark:text-slate-400">Join the professional community today</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-center border border-red-100 dark:border-red-900/50">
                            {error}
                        </div>
                    )}

                    <Input
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={FiUser}
                        required
                    />

                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={FiMail}
                        required
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={FiLock}
                        required
                    />

                    <Button type="submit" fullWidth disabled={loading} className="mt-2 text-white shadow-lg shadow-primary/25">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?
                    <Link to="/login" className="font-semibold text-primary hover:text-primary-hover ml-1 transition-colors">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Register
