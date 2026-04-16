import type { ProjectCard } from '../../types/portfolio'
import { CtaSection } from './CtaSection'
import { HeroSection } from './HeroSection'
import { ProjectsSection } from './ProjectsSection'
import { ServicesSection } from './ServicesSection'

type HomePageProps = {
    projects: ProjectCard[]
    onSelectProject: (projectId: ProjectCard['id']) => void
}

export function HomePage({ projects, onSelectProject }: HomePageProps) {
    return (
        <main id="top" className="pt-24">
            <HeroSection />
            <ProjectsSection projects={projects} onSelectProject={onSelectProject} />
            <ServicesSection />
            <CtaSection />
        </main>
    )
}
