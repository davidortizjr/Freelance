type SiteHeaderProps = {
    onHomeClick: () => void
    onStartProjectClick?: () => void
    variant?: 'home' | 'detail'
}

const navigationItems = ['Portfolio', 'Process', 'About', 'Contact'] as const

export function SiteHeader({ onHomeClick, onStartProjectClick, variant = 'home' }: SiteHeaderProps) {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/65 backdrop-blur-xl">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
                <button
                    type="button"
                    onClick={onHomeClick}
                    className="font-headline text-2xl font-black tracking-[-0.08em] text-[#111111]"
                >
                    CURATOR
                </button>

                <div className="hidden items-center gap-10 md:flex">
                    {navigationItems.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={onHomeClick}
                            className={
                                variant === 'home' && item === 'Portfolio'
                                    ? 'border-b-2 border-[var(--color-primary)] pb-1 font-bold text-[var(--color-primary)]'
                                    : 'text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900'
                            }
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onStartProjectClick}
                    className="rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:px-8"
                >
                    {variant === 'detail' ? 'Back to Projects' : 'Start Project'}
                </button>
            </div>
        </nav>
    )
}
