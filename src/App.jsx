import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import React, { Suspense } from 'react'
import Loading from './components/common/Loading'

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Network = React.lazy(() => import('./pages/Network'))
const Jobs = React.lazy(() => import('./pages/Jobs'))
const Learning = React.lazy(() => import('./pages/Learning'))
const Messaging = React.lazy(() => import('./pages/Messaging'))
const Landing = React.lazy(() => import('./pages/Landing'))

function App() {
    const { user, loading } = useAuth()

    if (loading) return <Loading />

    return (
        <div className="app-container">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Landing />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

                    {/* Protected Routes */}
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/network" element={user ? <Network /> : <Navigate to="/login" />} />
                    <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
                    <Route path="/learning" element={user ? <Learning /> : <Navigate to="/login" />} />
                    <Route path="/messaging" element={user ? <Messaging /> : <Navigate to="/login" />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
