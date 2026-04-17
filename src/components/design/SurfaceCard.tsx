import { cx } from '../../lib/cx'

type SurfaceCardProps = {
    children: React.ReactNode
    className?: string
}

export function SurfaceCard({ children, className }: SurfaceCardProps) {
    return (
        <div className={cx('rounded-[1.25rem] border border-black/5 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]', className)}>
            {children}
        </div>
    )
}
