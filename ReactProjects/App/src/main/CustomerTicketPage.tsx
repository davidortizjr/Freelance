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

const CustomerTicketPage = () => {
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

    const [subject, setSubject] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [category, setCategory] = useState('Technical')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        setSuccess('')

        if (!subject.trim() || !description.trim()) {
            setError('Please fill in all fields')
            return
        }

        if (!user?.userId) {
            setError('User session not found. Please sign in again.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.userId,
                    subject,
                    priority,
                    category,
                    description,
                }),
            })

            if (!res.ok) {
                const message = await res.text()
                throw new Error(message || 'Failed to create ticket')
            }

            setSubject('')
            setPriority('Medium')
            setCategory('Technical')
            setDescription('')
            setSuccess('Ticket submitted successfully!')
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create ticket'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/', { replace: true })
    }

    useEffect(() => {
        if (!user) return
        const isAdmin = String(user.role || '').toLowerCase() === 'admin'
        if (isAdmin) {
            navigate('/', { replace: true })
        }
    }, [navigate, user])

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
                <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">SupportDesk</h1>
                        <p className="text-sm text-slate-500">Submit a support request</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">{user.fullName}</p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => navigate('/customer')}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-10">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-200">
                        <h2 className="text-lg font-bold">Create a Ticket</h2>
                        <p className="text-sm text-slate-500">Share details so our team can help you faster.</p>
                    </div>
                    <form className="p-8 space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-700 font-medium">{success}</p>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold">Subject</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3"
                                placeholder="Summarize the issue"
                                type="text"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3"
                                >
                                    <option>Technical</option>
                                    <option>Billing</option>
                                    <option>Feature Request</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3 min-h-[140px]"
                                placeholder="Detailed information about the request..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-sm font-bold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CustomerTicketPage
