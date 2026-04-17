import { Link } from 'react-router-dom'

import { Container } from '../design/Container'
import { PageTitleHeader } from './PageTitleHeader'

const values = [
    {
        title: 'Technical Rigor',
        description: 'We treat every line of code with the same reverence as a master mason treats a stone block.',
    },
    {
        title: 'Radical Transparency',
        description: 'No black boxes. You are a partner in the process, with full visibility into every design decision.',
    },
    {
        title: 'Sustainable Design',
        description: 'We build digital assets that stand the test of time, resisting the churn of fleeting trends.',
    },
]

export function AboutPage() {
    return (
        <main className="pt-32">
            <PageTitleHeader
                eyebrow="Our Identity"
                title="Architecture of Digital Soul."
                description="Curator is a boutique design agency born from the belief that precision is the foundation of beauty. We do not just build interfaces; we architect digital monographs that demand attention and command respect."
                className="mb-0"
            />

            <section className="mb-24 sm:mb-32">
                <Container>
                    <div className="relative mt-20">
                        <div className="aspect-[21/9] w-full overflow-hidden rounded-xl">
                            <img
                                className="h-full w-full object-cover"
                                alt="Minimalist architectural office interior"
                                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80"
                            />
                        </div>
                        <div className="absolute -bottom-12 right-12 hidden max-w-md rounded-[1.25rem] border border-black/5 bg-white p-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:block">
                            <h3 className="mb-4 text-2xl font-bold tracking-[-0.03em]">The Curation Creed</h3>
                            <p className="leading-relaxed text-[var(--color-text-muted)]">
                                Every pixel must serve a purpose. Every interaction must tell a story. We reject template culture in favor of bespoke craftsmanship.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-24 sm:py-32">
                <Container>
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
                        <div className="relative">
                            <div className="aspect-square overflow-hidden rounded-xl">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="Creative team discussing architecture plans"
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                                />
                            </div>
                            <div className="absolute -left-8 -top-8 rounded-xl bg-[var(--color-primary)] p-8 text-white shadow-2xl sm:p-10">
                                <div className="text-4xl font-black">12+</div>
                                <div className="mt-2 text-xs uppercase tracking-[0.18em] opacity-80">Years of Craft</div>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-headline mb-8 text-4xl font-black leading-tight tracking-[-0.08em] md:text-5xl">
                                Beyond Aesthetics. <br /> Pure Utility.
                            </h2>
                            <div className="space-y-12">
                                {values.map((value) => (
                                    <div key={value.title} className="flex gap-6">
                                        <div className="h-16 w-px bg-[var(--color-border-strong)]" />
                                        <div>
                                            <h4 className="mb-2 text-xl font-bold">{value.title}</h4>
                                            <p className="text-[var(--color-text-muted)]">{value.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-zinc-900 py-24 text-white sm:py-32">
                <Container>
                    <div className="mx-auto max-w-5xl text-center">
                        <h2 className="font-headline mb-12 text-5xl font-black tracking-[-0.08em] md:text-7xl lg:text-8xl">Ready to Curate?</h2>
                        <div className="flex flex-col justify-center gap-6 md:flex-row">
                            <Link
                                to="/start-project"
                                className="rounded-full bg-[var(--color-primary)] px-12 py-5 text-lg font-bold transition-opacity hover:opacity-90"
                            >
                                Start a Conversation
                            </Link>
                            <Link
                                to="/process"
                                className="rounded-full border border-white/20 px-12 py-5 text-lg font-bold transition-colors hover:bg-white/10"
                            >
                                View Our Process
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
