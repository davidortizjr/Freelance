import { cx } from '../../lib/cx'

type SectionHeaderProps = {
    eyebrow?: string
    title: string
    action?: React.ReactNode
    className?: string
}

export function SectionHeader({ eyebrow, title, action, className }: SectionHeaderProps) {
    return (
        <div className={cx('mb-10 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between', className)}>
            <div>
                {eyebrow ? (
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        {eyebrow}
                    </span>
                ) : null}
                <h2 className="font-headline text-4xl font-black tracking-[-0.08em] sm:text-5xl lg:text-6xl">{title}</h2>
            </div>
            {action}
        </div>
    )
}
