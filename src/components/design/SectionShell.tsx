import { cx } from '../../lib/cx'

type SectionTone = 'base' | 'soft' | 'muted'
type SectionSpacing = 'normal' | 'comfortable'

type SectionShellProps = {
    children: React.ReactNode
    id?: string
    className?: string
    tone?: SectionTone
    spacing?: SectionSpacing
}

const toneMap: Record<SectionTone, string> = {
    base: 'bg-[var(--color-background)]',
    soft: 'bg-[var(--color-surface-soft)]',
    muted: 'bg-[var(--color-surface-muted)]',
}

const spacingMap: Record<SectionSpacing, string> = {
    normal: 'py-20 sm:py-28',
    comfortable: 'py-16 sm:py-24',
}

export function SectionShell({ children, id, className, tone = 'base', spacing = 'normal' }: SectionShellProps) {
    return (
        <section id={id} className={cx(toneMap[tone], spacingMap[spacing], className)}>
            {children}
        </section>
    )
}
