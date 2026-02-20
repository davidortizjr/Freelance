import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './main/App.tsx'
import CustomerDashboardPage from './main/CustomerDashboardPage.tsx'
import CustomerTicketPage from './main/CustomerTicketPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/customer" element={<CustomerDashboardPage />} />
        <Route path="/request" element={<CustomerTicketPage />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
