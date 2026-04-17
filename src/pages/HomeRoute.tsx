import { useNavigate } from 'react-router-dom'

import { HomePage } from '../components/home/HomePage'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { projects } from '../data/portfolio'

export function HomeRoute() {
    const navigate = useNavigate()

    return (
        <div className="app-shell">
            <SiteHeader variant="home" />
            <HomePage projects={projects} onSelectProject={(projectId) => navigate(`/projects/${projectId}`)} />
            <SiteFooter />
        </div>
    )
}
