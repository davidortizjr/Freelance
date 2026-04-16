export function SiteFooter() {
    return (
        <footer className="border-t border-black/5 bg-[var(--color-soft)] pb-12 pt-16 leading-relaxed sm:pt-24">
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-4 sm:px-8 md:grid-cols-3 lg:px-10">
                <div className="space-y-6">
                    <span className="font-headline text-xl font-bold tracking-[-0.06em] text-[#111111]">CURATOR</span>
                    <p className="max-w-xs text-zinc-500">© 2024 Curator Agency. Precision in every pixel.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        {['LinkedIn', 'Instagram', 'Clutch'].map((item: string) => (
                            <a key={item} className="text-zinc-500 underline decoration-2 underline-offset-4 transition-colors hover:text-zinc-900" href="#">
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        {['Email Us', 'Privacy Policy'].map((item: string) => (
                            <a key={item} className="text-zinc-500 underline decoration-2 underline-offset-4 transition-colors hover:text-zinc-900" href="#">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <span className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Headquarters</span>
                    <p className="text-zinc-500">
                        1200 Creative Way, Ste 400
                        <br />
                        San Francisco, CA 94103
                    </p>
                    <div className="pt-4">
                        <a className="font-bold text-[var(--color-primary)]" href="mailto:hello@curator.agency">
                            hello@curator.agency
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
