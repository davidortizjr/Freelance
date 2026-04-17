import { Link } from 'react-router-dom'

import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'

export function CtaSection() {
    return (
        <SectionShell className="px-4 pb-20 sm:px-8 sm:pb-32 !pt-0" spacing="normal">
            <Container>
                <div className="mx-auto max-w-screen-2xl overflow-hidden rounded-[1.5rem] bg-[var(--color-primary)] px-6 py-16 text-white shadow-[0_30px_80px_rgba(0,65,200,0.24)] sm:px-8 sm:py-24 lg:px-12">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="font-headline mb-10 text-4xl font-black tracking-[-0.08em] sm:text-6xl lg:text-7xl">
                            HAVE A VISION? <br /> LET&apos;S BUILD IT.
                        </h2>
                        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
                            <Link
                                to="/start-project"
                                className="rounded-full bg-white px-8 py-4 text-lg font-bold text-[var(--color-primary)] transition-opacity hover:opacity-90 sm:px-12 sm:py-5"
                            >
                                Start a Project
                            </Link>
                            <a href="mailto:hello@curator.agency" className="border-b-2 border-white pb-1 text-lg font-bold">
                                Email our team
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </SectionShell>
    )
}
