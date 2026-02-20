interface TicketButtonProps {
    onClick?: () => void
}

export function TicketButton({ onClick }: TicketButtonProps) {
    return (
        <button type="button" onClick={onClick} className="bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span>Create New Ticket
        </button>);
}