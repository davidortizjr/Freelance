import type { ProjectCard } from '../../types/portfolio'

import { Container } from '../design/Container'
import { SectionHeader } from '../design/SectionHeader'
import { SectionShell } from '../design/SectionShell'
import { SurfaceCard } from '../design/SurfaceCard'

type ProjectsSectionProps = {
    projects: ProjectCard[]
    onSelectProject: (projectId: ProjectCard['id']) => void
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
    return (
        <SectionShell id="portfolio" tone="soft" spacing="normal">
            <Container>
                <SectionHeader
                    eyebrow="Our Work"
                    title="SELECTED CASES"
                    action={
                        <button
                            type="button"
                            className="inline-flex w-fit border-b-2 border-[var(--color-primary)] pb-1 font-bold text-[var(--color-primary)] transition-opacity hover:opacity-70"
                            onClick={() => onSelectProject(projects[0].id)}
                        >
                            View Featured Project
                        </button>
                    }
                />

                <div className="grid grid-cols-12 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => onSelectProject(project.id)}
                            className={`group col-span-12 text-left ${index === 0 ? 'md:col-span-8' : index === 1 ? 'md:col-span-4' : index === 2 ? 'md:col-span-5' : 'md:col-span-7'}`}
                        >
                            <SurfaceCard className={`mb-5 overflow-hidden ${index === 0 ? 'aspect-[16/9]' : index === 1 ? 'aspect-[4/5]' : index === 2 ? 'aspect-square' : 'aspect-[3/2]'}`}>
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    alt={project.title}
                                    src={project.image}
                                />
                            </SurfaceCard>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="mb-1 text-2xl font-bold tracking-[-0.03em]">{project.title}</h3>
                                    <p className="font-medium text-[#434656]">
                                        {project.category}
                                        {project.year ? ` • ${project.year}` : ''}
                                    </p>
                                </div>
                                <span className="text-3xl leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </Container>
        </SectionShell>
    )
}
