import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Sidebar, Header } from '../components'
import { MainHeader } from '../components/MainHeader'
import TicketStats from '../components/TicketStats'
import TicketsTable from '../components/TicketsTable'
import Pagination from '../components/Pagination'
import CreateTicketModal from '../components/CreateTicketModal'
import EditTicketModal from '../components/EditTicketModal'
import DeleteTicketModal from '../components/DeleteTicketModal'
import CustomersTab from './tabs/CustomersTab'
import DashboardTab from './tabs/DashboardTab'
import ReportsTab from './tabs/ReportsTab'
import SettingsTab from './tabs/SettingsTab'
import LoginPage from './LoginPage'
import type { Ticket, TicketStats as TicketStatsType } from '../components/types'

type AuthUser = {
  userId: number
  email: string
  fullName: string
  role: string
  avatarUrl?: string | null
}

const getStoredUser = (): AuthUser | null => {
  const token = localStorage.getItem('authToken')
  if (!token) return null

  const stored = localStorage.getItem('user')
  if (!stored) return null

  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    return null
  }
}

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser())
  const isLoggedIn = Boolean(user)
  const [activeNav, setActiveNav] = useState('tickets')
  const [hasNotifications, setHasNotifications] = useState(true)

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [stats, setStats] = useState<TicketStatsType>({ total: 0, open: 0, pending: 0, resolved: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!user) return
    const isAdmin = String(user.role || '').toLowerCase() === 'admin'
    if (!isAdmin) {
      navigate('/customer', { replace: true })
      return
    }
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tickets?page=${currentPage}`)
        if (!res.ok) throw new Error('Failed to fetch tickets')
        const json = await res.json()
        if (!mounted) return
        setTickets(json.tickets || [])
        setStats(json.stats || { total: 0, open: 0, pending: 0, resolved: 0 })
        setTotalPages(json.totalPages || 1)
      } catch (err) {
        if (!mounted) return
        setTickets([])
      }
    }
    fetchData()
    return () => {
      mounted = false
    }
  }, [currentPage, navigate, user])



  const handleNotificationClick = () => {
    setHasNotifications(false)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/', { replace: true })
  }

  const filteredTickets = searchQuery
    ? tickets.filter((ticket) => {
      const query = searchQuery.toLowerCase()
      return (
        ticket.id.toString().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        (ticket.description && ticket.description.toLowerCase().includes(query)) ||
        ticket.requester.name.toLowerCase().includes(query) ||
        ticket.priority.toLowerCase().includes(query) ||
        ticket.status.toLowerCase().includes(query)
      )
    })
    : tickets

  const handleCreateTicket = async (data: { subject: string; priority: string; category: string; description: string }) => {
    try {
      const userId = user?.userId
      if (!userId) {
        alert('User session not found. Please sign in again.')
        return
      }

      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId }),
      })
      if (!res.ok) throw new Error('Failed to create ticket')
      setCurrentPage(1)
      const fetchRes = await fetch('/api/tickets?page=1')
      const json = await fetchRes.json()
      setTickets(json.tickets || [])
      setStats(json.stats || { total: 0, open: 0, pending: 0, resolved: 0 })
      setTotalPages(json.totalPages || 1)
    } catch (err) {
    } finally {
      setIsModalOpen(false)
    }
  }

  const handleEditTicket = async (ticketId: string, data: { subject: string; priority: string; category: string; description: string; status: string }) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.text()
        console.error('Backend error:', error)
        throw new Error(`Failed to update ticket: ${res.status}`)
      }
      setCurrentPage(1)
      const fetchRes = await fetch('/api/tickets?page=1')
      const json = await fetchRes.json()
      setTickets(json.tickets || [])
      setStats(json.stats || { total: 0, open: 0, pending: 0, resolved: 0 })
      setTotalPages(json.totalPages || 1)
    } catch (err) {
      console.error('Edit ticket error:', err)
      alert(`Error updating ticket: ${err}`)
    } finally {
      setEditingTicket(null)
    }
  }

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete ticket')
      setCurrentPage(1)
      const fetchRes = await fetch('/api/tickets?page=1')
      const json = await fetchRes.json()
      setTickets(json.tickets || [])
      setStats(json.stats || { total: 0, open: 0, pending: 0, resolved: 0 })
      setTotalPages(json.totalPages || 1)
    } catch (err) {
    } finally {
      setDeletingTicket(null)
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar activeNav={activeNav} onNavChange={setActiveNav} user={user} />

          <main className="flex-1 flex flex-col overflow-hidden">
            {activeNav === 'tickets' ? (
              <>
                <Header
                  onSearch={handleSearch}
                  onNotificationClick={handleNotificationClick}
                  onSignOut={handleSignOut}
                  onCreateClick={() => setIsModalOpen(true)}
                  hasNotifications={hasNotifications}
                />

                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-7xl mx-auto">
                    <MainHeader />
                    <TicketStats stats={{ total: stats.total, open: stats.open, pending: stats.pending, resolved: stats.resolved }} />
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <TicketsTable tickets={filteredTickets} onEdit={(id) => setEditingTicket(tickets.find(t => t.id === id) || null)} onDelete={(id) => setDeletingTicket(tickets.find(t => t.id === id) || null)} />
                      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} />
                    </div>
                  </div>
                </div>
                <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTicket} />
                <EditTicketModal isOpen={editingTicket !== null} ticket={editingTicket} onClose={() => setEditingTicket(null)} onSubmit={handleEditTicket} />
                <DeleteTicketModal isOpen={deletingTicket !== null} ticket={deletingTicket} onClose={() => setDeletingTicket(null)} onConfirm={handleDeleteTicket} />
              </>
            ) : null}

            {activeNav === 'customers' ? <CustomersTab /> : null}
            {activeNav === 'dashboard' ? <DashboardTab /> : null}
            {activeNav === 'reports' ? <ReportsTab /> : null}
            {activeNav === 'settings' ? <SettingsTab /> : null}
          </main>
        </div>
      ) : (
        <LoginPage onLogin={(loggedInUser) => {
          setUser(loggedInUser)
          const isAdmin = String(loggedInUser.role || '').toLowerCase() === 'admin'
          if (!isAdmin) {
            navigate('/customer', { replace: true })
          }
        }} />
      )}
    </>
  )
}

export default App
