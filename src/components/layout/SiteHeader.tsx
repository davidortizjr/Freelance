import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SiteHeaderProps = {
    variant?: 'home' | 'detail' | 'about'
}

const navigationItems = [
    { label: 'Portfolio', to: '/#portfolio' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
] as const

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname, location.hash])

    const isItemActive = (label: (typeof navigationItems)[number]['label']) => {
        if (label === 'Portfolio') {
            return location.pathname === '/'
        }

        if (label === 'Process') {
            return location.pathname === '/process'
        }

        if (label === 'About') {
            return location.pathname === '/about'
        }

        if (label === 'Contact') {
            return location.pathname === '/contact' || location.pathname === '/start-project'
        }

        return false
    }

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/65 backdrop-blur-xl">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
                <Link to="/" className="font-headline text-2xl font-black tracking-[-0.08em] text-[#111111]">
                    CURATOR
                </Link>

                <div className="hidden items-center gap-10 md:flex">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={
                                isItemActive(item.label)
                                    ? 'border-b-2 border-[var(--color-primary)] pb-1 font-bold text-[var(--color-primary)]'
                                    : 'text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900'
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to={variant === 'detail' ? '/' : '/start-project'}
                        className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:px-8"
                    >
                        {variant === 'detail' ? 'Back to Projects' : 'Start Project'}
                    </Link>
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-zinc-800 transition-colors hover:bg-black/5 md:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {isMenuOpen ? (
                <div className="border-t border-black/5 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden sm:px-8">
                    <div className="mx-auto flex max-w-screen-2xl flex-col gap-3">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={
                                    isItemActive(item.label)
                                        ? 'rounded-lg bg-[var(--color-surface-muted)] px-4 py-3 font-bold text-[var(--color-primary)]'
                                        : 'rounded-lg px-4 py-3 font-medium text-zinc-700 transition-colors hover:bg-black/5'
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null}
        </nav>
    )
}
