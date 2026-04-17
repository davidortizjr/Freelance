import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'

const services = [
    {
        number: '01',
        title: 'Design & Identity',
        description:
            'Crafting visual systems that communicate value through clarity. From brand positioning to comprehensive design systems.',
    },
    {
        number: '02',
        title: 'Engineering',
        description:
            'Building robust digital foundations using modern stacks. We prioritize performance, accessibility, and clean architecture.',
    },
    {
        number: '03',
        title: 'Strategic Curation',
        description:
            'Helping brands find their unique voice in a crowded digital landscape through precise art direction and storytelling.',
    },
]

export function ServicesSection() {
    return (
        <SectionShell id="process" tone="base" spacing="normal">
            <Container>
                <div className="grid grid-cols-12 gap-10 lg:gap-12">
                    <div className="col-span-12 md:col-span-4">
                        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                            Our Expertise
                        </span>
                        <h2 className="font-headline text-4xl font-black tracking-[-0.08em] leading-tight sm:text-5xl">
                            WE PROVIDE THE PILLARS FOR MODERN BRANDS.
                        </h2>
                    </div>

                    <div className="col-span-12 md:col-span-8">
                        <div className="space-y-10 sm:space-y-14">
                            {services.map((service) => (
                                <div key={service.number} className="group flex items-start gap-6 border-b border-black/10 pb-10 sm:gap-8 sm:pb-12">
                                    <span className="font-headline text-4xl font-black text-[#b1b1b1] transition-colors group-hover:text-[var(--color-primary)] sm:text-5xl">
                                        {service.number}
                                    </span>
                                    <div>
                                        <h3 className="mb-4 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{service.title}</h3>
                                        <p className="max-w-2xl text-lg leading-relaxed text-[#434656]">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </SectionShell>
    )
}
