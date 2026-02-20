export interface Ticket {
    id: string
    subject: string
    description?: string
    requester: { name: string; initials: string }
    priority: string
    status: string
    date: string
}

export interface TicketStats {
    total: number
    open: number
    pending: number
    resolved: number
}

export interface TicketStatsProps {
    stats: TicketStats
}

export interface TicketsTableProps {
    tickets: Ticket[]
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}
