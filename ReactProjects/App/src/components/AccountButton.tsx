import { useState, useRef, useEffect } from 'react'

interface AccountButtonProps {
    onSignOut?: () => void;
}

export function AccountButton({ onSignOut }: AccountButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
            >
                <span className="material-symbols-outlined">account_circle</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-50">
                    <button
                        onClick={() => {
                            setIsOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">person</span>
                        Profile
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            onSignOut?.()
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
