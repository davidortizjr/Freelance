import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { ProjectDetailPage } from '../components/project/ProjectDetailPage'
import { SiteFooter } from '../components/layout/SiteFooter'
import { projectDetails, projects } from '../data/portfolio'
import type { ProjectId } from '../types/portfolio'

function isProjectId(value: string): value is ProjectId {
    return value in projectDetails
}

export function ProjectRoute() {
    const navigate = useNavigate()
    const { projectId } = useParams<{ projectId: string }>()

    if (!projectId || !isProjectId(projectId)) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="app-shell">
            <ProjectDetailPage
                project={projectDetails[projectId]}
                projects={projects}
                onSelectNextProject={(nextProjectId) => navigate(`/projects/${nextProjectId}`)}
            />
            <SiteFooter />
        </div>
    )
}
