import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'

type AuthUser = {
    userId: number
    email: string
    fullName: string
    role: string
    avatarUrl?: string | null
}

const CustomerDashboardPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<AuthUser | null>(() => {
        const token = localStorage.getItem('authToken')
        const stored = localStorage.getItem('user')
        if (!token || !stored) return null
        try {
            return JSON.parse(stored) as AuthUser
        } catch {
            localStorage.removeItem('user')
            localStorage.removeItem('authToken')
            return null
        }
    })

    useEffect(() => {
        if (!user) return
        const isAdmin = String(user.role || '').toLowerCase() === 'admin'
        if (isAdmin) {
            navigate('/', { replace: true })
        }
    }, [navigate, user])

    const handleSignOut = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/', { replace: true })
    }

    if (!user) {
        return (
            <LoginPage
                onLogin={(loggedInUser) => {
                    setUser(loggedInUser)
                    const isAdmin = String(loggedInUser.role || '').toLowerCase() === 'admin'
                    if (isAdmin) {
                        navigate('/', { replace: true })
                    }
                }}
            />
        )
    }

    return (
        <div className="min-h-screen bg-background-light text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">SupportDesk</h1>
                        <p className="text-sm text-slate-500">Customer Dashboard</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">{user.fullName}</p>
                        <button
                            onClick={handleSignOut}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
                    <h2 className="text-lg font-bold">Welcome back, {user.fullName}</h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Submit new requests, review your recent activity, or reach support.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={() => navigate('/request')}
                            className="px-5 py-2.5 text-sm font-bold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Create New Ticket
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-semibold uppercase text-slate-500">Open Tickets</p>
                        <p className="text-2xl font-bold mt-2">-</p>
                        <p className="text-xs text-slate-400 mt-2">Coming soon</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-semibold uppercase text-slate-500">Pending</p>
                        <p className="text-2xl font-bold mt-2">-</p>
                        <p className="text-xs text-slate-400 mt-2">Coming soon</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-semibold uppercase text-slate-500">Resolved</p>
                        <p className="text-2xl font-bold mt-2">-</p>
                        <p className="text-xs text-slate-400 mt-2">Coming soon</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CustomerDashboardPage
