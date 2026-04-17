import { Link } from 'react-router-dom'

import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'
import { SurfaceCard } from '../design/SurfaceCard'
import { PageTitleHeader } from './PageTitleHeader'

type ProcessStep = {
    number: string
    title: string
    icon: string
    description: string
}

const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Discovery',
        icon: 'search',
        description:
            "We dive deep into your brand's DNA, uncovering the unique tensions and opportunities that define your market position.",
    },
    {
        number: '02',
        title: 'Design',
        icon: 'draw',
        description:
            'Translating strategy into visual authority. We create high-fidelity prototypes that define the editorial rhythm of your product.',
    },
    {
        number: '03',
        title: 'Build',
        icon: 'code',
        description:
            'Precision engineering. We build with clean, scalable code that mirrors the elegance of the design, ensuring seamless performance.',
    },
    {
        number: '04',
        title: 'Launch',
        icon: 'rocket_launch',
        description:
            'The transition from project to presence. We orchestrate deployment and post-launch optimization with measurable outcomes.',
    },
]

export function ProcessPage() {
    return (
        <main className="pt-32">
            <PageTitleHeader
                eyebrow="Our Process"
                title="The Blueprint."
                description="Our systematic approach to creative problem solving, refined through a decade of high-stakes delivery."
                className="mb-0"
            />

            <SectionShell tone="muted" className="pb-24 pt-8 sm:pb-32 sm:pt-14">
                <Container>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step) => (
                            <SurfaceCard key={step.number} className="group h-full p-10 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="mb-16">
                                    <span className="font-headline text-6xl font-black text-[color:rgba(0,65,200,0.22)]">{step.number}</span>
                                </div>
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <h3 className="text-2xl font-bold tracking-[-0.03em]">{step.title}</h3>
                                    <span className="material-symbols-outlined text-3xl text-[var(--color-primary)]">{step.icon}</span>
                                </div>
                                <p className="leading-relaxed text-[var(--color-text-muted)]">{step.description}</p>
                            </SurfaceCard>
                        ))}
                    </div>
                </Container>
            </SectionShell>

            <section className="bg-zinc-900 py-24 text-white sm:py-32">
                <Container>
                    <div className="mx-auto max-w-5xl text-center">
                        <h2 className="font-headline mb-12 text-5xl font-black tracking-[-0.08em] md:text-7xl lg:text-8xl">Ready to Start?</h2>
                        <div className="flex flex-col justify-center gap-6 md:flex-row">
                            <Link
                                to="/start-project"
                                className="rounded-full bg-[var(--color-primary)] px-12 py-5 text-lg font-bold transition-opacity hover:opacity-90"
                            >
                                Start a Conversation
                            </Link>
                            <Link
                                to="/about"
                                className="rounded-full border border-white/20 px-12 py-5 text-lg font-bold transition-colors hover:bg-white/10"
                            >
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
