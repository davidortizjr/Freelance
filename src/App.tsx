import './App.css'

import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { AboutRoute } from './pages/AboutRoute'
import { ContactRoute } from './pages/ContactRoute'
import { HomeRoute } from './pages/HomeRoute'
import { ProcessRoute } from './pages/ProcessRoute'
import { ProjectRoute } from './pages/ProjectRoute'
import { StartProjectRoute } from './pages/StartProjectRoute'

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [pathname])

    return null
}

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/about-process" element={<Navigate to="/about" replace />} />
                <Route path="/about" element={<AboutRoute />} />
                <Route path="/process" element={<ProcessRoute />} />
                <Route path="/contact" element={<ContactRoute />} />
                <Route path="/projects/:projectId" element={<ProjectRoute />} />
                <Route path="/start-project" element={<StartProjectRoute />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    )
}

export default App