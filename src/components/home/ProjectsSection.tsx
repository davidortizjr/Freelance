import type { ProjectCard } from '../../types/portfolio'

type ProjectsSectionProps = {
    projects: ProjectCard[]
    onSelectProject: (projectId: ProjectCard['id']) => void
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
    return (
        <section id="portfolio" className="bg-[#f3f0ef] py-20 sm:py-28">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-10">
                <div className="mb-10 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                            Our Work
                        </span>
                        <h2 className="font-headline text-4xl font-black tracking-[-0.08em] sm:text-5xl lg:text-6xl">
                            SELECTED CASES
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="inline-flex w-fit border-b-2 border-[var(--color-primary)] pb-1 font-bold text-[var(--color-primary)] transition-opacity hover:opacity-70"
                        onClick={() => onSelectProject(projects[0].id)}
                    >
                        View Featured Project
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => onSelectProject(project.id)}
                            className={`group col-span-12 text-left ${index === 0 ? 'md:col-span-8' : index === 1 ? 'md:col-span-4' : index === 2 ? 'md:col-span-5' : 'md:col-span-7'}`}
                        >
                            <div
                                className={`mb-5 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 ${index === 0 ? 'aspect-[16/9]' : index === 1 ? 'aspect-[4/5]' : index === 2 ? 'aspect-square' : 'aspect-[3/2]'}`}
                            >
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    alt={project.title}
                                    src={project.image}
                                />
                            </div>
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
            </div>
        </section>
    )
}
