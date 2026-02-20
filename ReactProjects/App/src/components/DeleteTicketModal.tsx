import React from 'react'
import type { Ticket } from './types'

interface DeleteTicketModalProps {
    isOpen: boolean
    ticket: Ticket | null
    onClose: () => void
    onConfirm: (ticketId: string) => void
}

const DeleteTicketModal: React.FC<DeleteTicketModalProps> = ({ isOpen, ticket, onClose, onConfirm }) => {
    if (!isOpen || !ticket) return null

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-red-600">Delete Ticket</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 mb-2">Are you sure you want to delete this ticket?</p>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                        <p className="font-semibold text-slate-900">{ticket.subject}</p>
                        <p className="text-sm text-slate-500">ID: {ticket.id}</p>
                    </div>
                    <p className="text-sm text-slate-500">This action cannot be undone.</p>
                </div>
                <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(ticket.id)}
                        className="px-6 py-2 text-sm font-bold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTicketModal
