import React from 'react'
import type { TicketsTableProps } from './types'

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4 border-b border-slate-200">ID</th>
                        <th className="px-6 py-4 border-b border-slate-200  min-w-[300px]">Subject</th>
                        <th className="px-6 py-4 border-b border-slate-200">Requester</th>
                        <th className="px-6 py-4 border-b border-slate-200">Priority</th>
                        <th className="px-6 py-4 border-b border-slate-200">Status</th>
                        <th className="px-6 py-4 border-b border-slate-200">Date</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {tickets.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4 font-medium text-slate-500">#{t.id}</td>
                            <td className="px-6 py-4">
                                <p className="font-semibold text-sm text-slate-900">{t.subject}</p>
                                {t.description && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">{t.description}</p>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="size-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">{t.requester.initials}</div>
                                    <span className="text-sm font-medium">{t.requester.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-orange-700">{t.priority}</span>
                            </td>
                            <td className={/progress/i.test(t.status) ? 'px-2 py-4' : 'px-6 py-4'}>
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">{t.status}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{t.date}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit?.(t.id)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-all">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button onClick={() => onDelete?.(t.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TicketsTable
