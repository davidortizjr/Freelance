import { useEffect, useMemo, useState } from 'react'

interface Customer {
    id: string
    name: string
    email: string
    company: string
    tickets: number
    lastActive: string
    avatar?: string
}

export default function CustomersTab() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async (search?: string) => {
        try {
            setLoading(true)
            const params = search ? `?search=${encodeURIComponent(search)}` : ''
            const res = await fetch(`/api/customers${params}`)
            if (!res.ok) throw new Error('Failed to fetch customers')
            const data = await res.json()
            setCustomers(data || [])
        } catch (err) {
            setCustomers([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        fetchCustomers(value)
    }

    const filteredCustomers = useMemo(() => {
        return customers
    }, [customers])

    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            alert('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    company: formData.company || null,
                }),
            })
            if (!res.ok) throw new Error('Failed to create customer')
            setFormData({ firstName: '', lastName: '', email: '', company: '' })
            setIsModalOpen(false)
            fetchCustomers()
        } catch (err) {
            alert('Error creating customer')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                <div className="flex items-center gap-4 flex-1 max-w-xl">
                    <div className="relative w-full">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            search
                        </span>
                        <input
                            className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 disabled:opacity-60"
                            placeholder="Search customers by name, email or company..."
                            type="text"
                            value={searchQuery}
                            onChange={(event) => handleSearch(event.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 mx-2"></div>
                    <button
                        className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        Add Customer
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Customer Directory</h2>
                            <p className="text-slate-500 mt-1">Manage customer profiles and view their support activity history.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filters
                            </button>
                            <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">upload_file</span>
                                Import
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Customers</p>
                            <h3 className="text-3xl font-bold mt-2">{customers.length}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-2">From database</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">Results</p>
                            <h3 className="text-3xl font-bold mt-2">{filteredCustomers.length}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-2">Showing filtered results</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                            <h3 className="text-3xl font-bold mt-2">{loading ? '...' : 'Ready'}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-2">{loading ? 'Loading' : 'All synced'}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Tickets</p>
                            <h3 className="text-3xl font-bold mt-2">{Math.round((customers.reduce((sum, c) => sum + c.tickets, 0) / customers.length) || 0)}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-2">Per customer</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {loading ? (
                            <div className="p-8 text-center">
                                <p className="text-slate-500">Loading customers...</p>
                            </div>
                        ) : filteredCustomers.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-slate-500">No customers found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                            <th className="px-6 py-4 border-b border-slate-200">Name</th>
                                            <th className="px-6 py-4 border-b border-slate-200">Email</th>
                                            <th className="px-6 py-4 border-b border-slate-200">Company</th>
                                            <th className="px-6 py-4 border-b border-slate-200 text-center">Total Tickets</th>
                                            <th className="px-6 py-4 border-b border-slate-200">Last Active</th>
                                            <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredCustomers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="size-10 rounded-full bg-slate-200 bg-cover bg-center border border-slate-100"
                                                            style={{ backgroundImage: `url('${customer.avatar}')` }}
                                                        ></div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                                                            <p className="text-xs text-slate-500">ID: #{customer.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{customer.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium">{customer.company}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-sm font-semibold px-2 py-0.5 bg-slate-100 rounded">{customer.tickets}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{customer.lastActive}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-all">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen ? (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Add New Customer</h3>
                            <button className="p-1 hover:bg-slate-100 rounded-full" onClick={() => setIsModalOpen(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">First Name</label>
                                    <input
                                        className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3 disabled:opacity-60"
                                        placeholder="John"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">Last Name</label>
                                    <input
                                        className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3 disabled:opacity-60"
                                        placeholder="Doe"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">Email Address</label>
                                <input
                                    className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3 disabled:opacity-60"
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">Company</label>
                                <input
                                    className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-3 disabled:opacity-60"
                                    placeholder="Acme Inc."
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 -m-6 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg disabled:opacity-60"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}
