import React, { useState } from 'react'

interface CreateTicketModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { subject: string; priority: string; category: string; description: string }) => void
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [subject, setSubject] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [category, setCategory] = useState('Technical')
    const [description, setDescription] = useState('')

    const handleSubmit = () => {
        if (!subject.trim() || !description.trim()) {
            alert('Please fill in all fields')
            return
        }
        onSubmit({ subject, priority, category, description })
        setSubject('')
        setPriority('Medium')
        setCategory('Technical')
        setDescription('')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Create New Ticket</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold">Subject</label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-2"
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
                                className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-2"
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
                                className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-2"
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
                            className="w-full bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-primary/50 py-2.5 px-2 min-h-[120px]"
                            placeholder="Detailed information about the request..."
                        ></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 text-sm font-bold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Create Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTicketModal
