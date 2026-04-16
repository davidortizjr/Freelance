export function HeroSection() {
    return (
        <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-8 sm:pt-16 lg:pb-28">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,65,200,0.08),_transparent_34%),radial-gradient(circle_at_85%_15%,_rgba(98,255,149,0.18),_transparent_24%),linear-gradient(to_bottom,_rgba(255,255,255,0.92),_rgba(252,249,248,1))]" />
            <div className="mx-auto grid max-w-screen-2xl grid-cols-12 items-end gap-6">
                <div className="col-span-12 mb-8 md:col-span-7 md:mb-0">
                    <h1 className="font-headline mb-8 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-6xl lg:text-[5.6rem]">
                        CREATING <br /> <span className="italic text-[var(--color-primary)]">DIGITAL</span> ARTIFACTS.
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-[#434656] sm:text-xl">
                        An independent design studio focusing on the intersection of high-end aesthetics and technical precision.
                        We curate experiences that demand attention.
                    </p>
                </div>

                <div className="relative col-span-12 md:col-span-5">
                    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.16)] ring-1 ring-black/5 transition-transform duration-700 hover:-translate-y-1 hover:scale-[1.015]">
                        <img
                            className="h-full w-full object-cover"
                            alt="Minimalist architectural office space with clean lines, concrete walls, and large windows with soft natural light"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIpA6nY75XMFdgU2p2gfZ4pda_RucjX8QHtTBeAcjqA9YiefdB5pa3CM5hctWp8rvniaK0p-rGYLHuzbZNeTV2Kc1e77qwZhu6eJVwOOkYb4CrlNBpEMkS5LSiKFeltuU5cY0Vm1L6edZO6wDpeMb7opzivF8LyslH2AquU5sBbV-AgxGKsySdeT4y8J8am2IZlUSDlySgOIrZR893XraZUyXp1gFm1BR0_HmO5EJdMAGsNcMgGx-hnGawDm1yh_l6efEHSugJlE2B"
                        />
                    </div>

                    <div className="absolute -bottom-8 left-4 hidden max-w-xs rounded-[1.25rem] border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-2xl md:-left-8 md:block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                            Featured 2024
                        </span>
                        <p className="font-headline text-lg font-bold text-[#1c1b1b]">The Zenith Architecture Brand Identity</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
