import { Container } from '../design/Container'

type PageTitleHeaderProps = {
    eyebrow: string
    title: string
    description: string
    className?: string
}

export function PageTitleHeader({ eyebrow, title, description, className }: PageTitleHeaderProps) {
    return (
        <section className={className ?? 'mb-24 sm:mb-32'}>
            <Container>
                <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">{eyebrow}</span>
                        <h1 className="font-headline mb-8 text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl lg:text-8xl">{title}</h1>
                    </div>
                    <div className="pb-4 lg:col-span-5">
                        <p className="text-xl leading-relaxed text-[var(--color-text-muted)]">{description}</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
