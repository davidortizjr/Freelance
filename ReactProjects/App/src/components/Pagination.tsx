import React from 'react'
import type { PaginationProps } from './types'

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [] as number[]
    for (let i = 1; i <= totalPages; i++) pages.push(i)

    return (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200  flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing <span className="font-semibold">{(currentPage - 1) * 5 + 1}</span> to <span className="font-semibold">{Math.min(currentPage * 5, totalPages * 5)}</span> of <span className="font-semibold">{totalPages * 5}</span> results</p>
            <div className="flex items-center gap-1">
                <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="p-2 border border-slate-200 rounded-lg hover:bg-white text-slate-400 disabled:opacity-50 flex items-center">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                {pages.slice(0, 3).map((p) => (
                    <button key={p} onClick={() => onPageChange(p)} className={`size-8 ${p === currentPage ? 'bg-blue-500 text-white rounded-lg text-sm font-bold' : 'hover:bg-slate-200 rounded-lg text-sm font-medium'}`}>{p}</button>
                ))}
                <span className="px-1 text-slate-400">...</span>
                <button onClick={() => onPageChange(Math.max(1, totalPages))} className="size-8 hover:bg-slate-200 rounded-lg text-sm font-medium">{totalPages}</button>
                <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className="p-2 border border-slate-200 rounded-lg hover:bg-white text-slate-400 flex items-center">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </div>
    )
}

export default Pagination
