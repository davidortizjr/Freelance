import './App.css'

import { useState } from 'react'

import { HomePage } from './components/home/HomePage'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ProjectDetailPage } from './components/project/ProjectDetailPage'
import { projectDetails, projects } from './data/portfolio.ts'
import type { ProjectId } from './types/portfolio'

function App() {
    const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null)

    const selectedProject = selectedProjectId ? projectDetails[selectedProjectId] : null

    return selectedProject ? (
        <div className="app-shell">
            <ProjectDetailPage
                project={selectedProject}
                projects={projects}
                onHomeClick={() => setSelectedProjectId(null)}
                onSelectNextProject={setSelectedProjectId}
            />
            <SiteFooter />
        </div>
    ) : (
        <div className="app-shell">
            <SiteHeader
                variant="home"
                onHomeClick={() => setSelectedProjectId(null)}
                onStartProjectClick={() => setSelectedProjectId(projects[0].id)}
            />
            <HomePage projects={projects} onSelectProject={setSelectedProjectId} />
            <SiteFooter />
        </div>
    )
}

export default App