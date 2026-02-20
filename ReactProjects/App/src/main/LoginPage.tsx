import { useState } from 'react'

interface LoginPageProps {
    onLogin: (user: { userId: number; email: string; fullName: string; role: string; avatarUrl?: string | null }) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.message || 'Invalid email or password')
                return
            }

            const data = await res.json()
            const token = `session-${data.userId}-${Date.now()}`
            localStorage.setItem('authToken', token)
            localStorage.setItem('user', JSON.stringify(data))
            onLogin(data)
        } catch (err) {
            setError('Failed to connect to server. Make sure backend is running on port 5285')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background-light text-slate-900">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="bg-blue-500 rounded-xl p-3 text-white shadow-lg shadow-primary/20 mb-4 flex items-center">
                        <span className="material-symbols-outlined text-4xl">confirmation_number</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">SupportDesk</h1>
                    <p className="text-slate-500 mt-1 font-medium">Admin Control Panel</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">Sign In</h2>
                            <p className="text-sm text-slate-500 mt-1">Enter your credentials to access the dashboard</p>
                        </div>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                        id="email"
                                        placeholder="name@company.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                                    <a className="text-xs font-semibold text-primary hover:text-blue-600 transition-colors" href="#">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" type="button">
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input className="size-4 rounded border-slate-300 text-primary focus:ring-primary/20" id="remember" type="checkbox" />
                                <label className="ml-2 text-sm text-slate-600 select-none" htmlFor="remember">Remember me for 30 days</label>
                            </div>
                            <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                                <span className="material-symbols-outlined text-xl">{loading ? 'hourglass_empty' : 'arrow_forward'}</span>
                            </button>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Protected by enterprise-grade encryption.
                            <a className="underline hover:text-slate-700" href="#"> Security Policy</a>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                    All systems operational
                </div>
            </div>
        </div>
    )
}
