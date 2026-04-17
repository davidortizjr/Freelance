import type { ProjectCard, ProjectDetail } from '../../types/portfolio'
import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'
import { SurfaceCard } from '../design/SurfaceCard'
import { SiteHeader } from '../layout/SiteHeader'

type ProjectDetailPageProps = {
    project: ProjectDetail
    projects: ProjectCard[]
    onSelectNextProject: (projectId: ProjectCard['id']) => void
}

export function ProjectDetailPage({ project, projects, onSelectNextProject }: ProjectDetailPageProps) {
    const nextProject = projects.find((item) => item.id === project.nextProject) ?? projects[0]

    return (
        <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
            <SiteHeader variant="detail" />

            <main className="pt-20">
                <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden sm:h-[870px]">
                    <img alt={`${project.heroTitle} project header`} className="h-full w-full object-cover" src={project.heroImage} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,27,27,0)_0%,rgba(28,27,27,0.12)_50%,rgba(28,27,27,0.8)_100%)]" />
                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-24">
                        <div className="mx-auto max-w-screen-2xl">
                            <span className="mb-6 inline-block rounded-full bg-[var(--color-primary)] px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
                                {project.label}
                            </span>
                            <h1 className="font-headline max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl">
                                {project.displayTitle.split('\n').map((line: string) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </div>
                </section>

                <SectionShell spacing="comfortable" className="!bg-transparent">
                    <Container>
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                            <div className="space-y-20 lg:col-span-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-[var(--color-primary)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            bolt
                                        </span>
                                        <h2 className="font-headline text-sm font-bold uppercase tracking-[0.2em]">The Challenge</h2>
                                    </div>
                                    <p className="max-w-4xl text-2xl leading-relaxed text-[#434656] sm:text-3xl">{project.challenge}</p>
                                </div>

                                <div className="relative group">
                                    <SurfaceCard className="overflow-hidden">
                                        <img
                                            alt={`${project.heroTitle} detail visual`}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            src={project.gallery[0]}
                                        />
                                    </SurfaceCard>
                                    <div className="hidden rounded-[1.25rem] border border-black/5 bg-white/75 p-8 shadow-2xl backdrop-blur-2xl md:absolute md:-bottom-10 md:-right-10 md:block md:max-w-sm">
                                        <p className="text-lg italic leading-relaxed text-[#1c1b1b]">“{project.quote}”</p>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <div className="flex items-center gap-4 text-[var(--color-primary)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            architecture
                                        </span>
                                        <h2 className="font-headline text-sm font-bold uppercase tracking-[0.2em]">The Solution</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-8 text-lg leading-relaxed text-[#434656] md:grid-cols-2">
                                        {project.solution.map((paragraph: string) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {project.gallery.slice(1).map((image: string, index: number) => (
                                        <div
                                            key={image}
                                            className={index === 0 ? 'col-span-2 row-span-2 overflow-hidden rounded-[1.25rem] bg-[#f3f0ef]' : 'h-64 overflow-hidden rounded-[1.25rem] bg-[#f3f0ef]'}
                                        >
                                            <img alt={`${project.heroTitle} gallery ${index + 2}`} className="h-full w-full object-cover" src={image} />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-12 rounded-[1.25rem] bg-[#f3f0ef] p-8 sm:p-12 md:p-20">
                                    <div className="flex items-center gap-4 text-[var(--color-primary)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            trending_up
                                        </span>
                                        <h2 className="font-headline text-sm font-bold uppercase tracking-[0.2em]">Results</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                                        {project.stats.map((stat: { value: string; label: string }) => (
                                            <div key={stat.label}>
                                                <h3 className="mb-2 font-headline text-5xl font-black text-[var(--color-primary)]">{stat.value}</h3>
                                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#434656]">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <aside className="lg:col-span-4">
                                <div className="sticky top-28 space-y-12 rounded-[1.25rem] border border-black/5 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-10">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#737688]">Client</p>
                                        <p className="font-headline text-xl font-bold">{project.client}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#737688]">Date</p>
                                        <p className="font-headline text-xl font-bold">{project.date}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#737688]">Services</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.services.map((service: string) => (
                                                <span key={service} className="rounded-full bg-[#f3f0ef] px-4 py-2 text-xs font-bold">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t border-black/5 pt-8">
                                        <a
                                            className="flex items-center justify-between rounded-full bg-[var(--color-primary)] px-8 py-4 font-bold text-white transition-opacity hover:opacity-90"
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Visit Live Site
                                            <span className="material-symbols-outlined">north_east</span>
                                        </a>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </Container>
                </SectionShell>

                <SectionShell tone="muted" className="px-4 sm:px-8 lg:px-10">
                    <Container className="text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.4em] text-[#737688]">Next Case Study</span>
                        <button type="button" onClick={() => onSelectNextProject(nextProject.id)} className="group mt-6 block w-full">
                            <h2 className="font-headline text-5xl font-black tracking-[-0.08em] transition-colors duration-500 group-hover:text-[var(--color-primary)] sm:text-7xl lg:text-9xl">
                                {nextProject.title.toUpperCase()}
                            </h2>
                        </button>
                    </Container>
                </SectionShell>
            </main>
        </div>
    )
}
