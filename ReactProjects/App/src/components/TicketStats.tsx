import React from 'react'
import type { TicketStatsProps } from './types'

const TicketStats: React.FC<TicketStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tickets</p>
                <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Open</p>
                <h3 className="text-2xl font-bold mt-1">{stats.open}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Pending</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pending}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Resolved</p>
                <h3 className="text-2xl font-bold mt-1">{stats.resolved}</h3>
            </div>
        </div>
    )
}

export default TicketStats
