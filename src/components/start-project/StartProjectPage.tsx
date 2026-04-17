import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'
import { SiteFooter } from '../layout/SiteFooter'

type IntakePayload = {
    name: string
    email: string
    projectType: string
    budget: string
    description: string
}

const projectTypes = ['Digital Experience', 'Brand Identity', 'Visual Strategy', 'Other'] as const

const initialState: IntakePayload = {
    name: '',
    email: '',
    projectType: 'Digital Experience',
    budget: '10-25k',
    description: '',
}

export function StartProjectPage() {
    const [formData, setFormData] = useState<IntakePayload>(initialState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage(null)

        try {
            const response = await fetch('/api/intake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Unable to submit project request')
            }

            setMessage('Project request submitted. We will get back to you soon.')
            setFormData(initialState)
        } catch {
            setMessage('Submission failed. Please try again in a moment.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="app-shell">
            <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl">
                <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-6 tracking-tight">
                    <Link to="/" className="font-headline text-2xl font-black tracking-[-0.08em] text-zinc-900">
                        CURATOR
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-900">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Site
                    </Link>
                </nav>
            </header>

            <main className="min-h-screen px-6 pb-24 pt-32 md:px-8">
                <Container size="narrow" className="!px-0">
                    <div className="relative mb-20">
                        <div className="grid grid-cols-1 items-end gap-0 md:grid-cols-12">
                            <div className="z-10 md:col-span-7">
                                <h1 className="font-headline mb-6 text-5xl font-extrabold leading-[0.9] tracking-[-0.08em] text-[var(--color-text)] md:text-7xl">
                                    Let&apos;s build <br /> something <span className="text-[var(--color-primary)]">remarkable</span>.
                                </h1>
                                <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-muted)]">
                                    We believe in precision, intent, and high-fidelity execution. Share your vision with us, and we&apos;ll
                                    handle the rest.
                                </p>
                            </div>
                            <div className="relative hidden h-[400px] md:col-span-5 md:block">
                                <img
                                    className="h-full w-full rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="Modern architectural interior"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgBpZAxoGwU6j-xAPk-OjoaCdfDlZ-_p3WMbZHobGmNzR0b0IAVZvOq5KRpq2SsapeI4t7G_li-t2tybKAEWSsazBPadqc0_A7tc6PLKxuSNyaCExzMwdqgn1_GzWOWjUhZLIDlww7IPmNEkHzJENH49qa4o254pCVfN8IdJaQtRiMAUCUWNOeTG4ud-DrWaPf2kTaoEejxLiv0qhcwPmuo61ml8U-1KuxukIPi0Tuh59j2PBee-MFmT1T5Ff7pPV711x6HTbe3q2a"
                                />
                                <div className="absolute -bottom-10 -left-20 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-2xl backdrop-blur-xl opacity-90">
                                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-primary)]">
                                        New Project Inquiry
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SectionShell className="rounded-xl !py-0" tone="soft" spacing="normal">
                        <form className="space-y-12 p-8 md:p-16" onSubmit={onSubmit}>
                            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        required
                                        type="text"
                                        placeholder="Alexander Curator"
                                        value={formData.name}
                                        onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                                        className="w-full border-b-2 border-x-0 border-t-0 border-[var(--color-border-strong)]/40 bg-transparent px-0 py-4 text-xl font-medium placeholder:text-[var(--color-border-strong)]/70 focus:border-[var(--color-primary)] focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        placeholder="hello@curator.agency"
                                        value={formData.email}
                                        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                                        className="w-full border-b-2 border-x-0 border-t-0 border-[var(--color-border-strong)]/40 bg-transparent px-0 py-4 text-xl font-medium placeholder:text-[var(--color-border-strong)]/70 focus:border-[var(--color-primary)] focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Project Type</label>
                                <div className="flex flex-wrap gap-4">
                                    {projectTypes.map((projectType) => (
                                        <label key={projectType} className="group relative cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                type="radio"
                                                name="project_type"
                                                checked={formData.projectType === projectType}
                                                onChange={() => setFormData((prev) => ({ ...prev, projectType }))}
                                            />
                                            <div className="rounded-full border-2 border-[var(--color-border-strong)]/40 px-6 py-3 text-sm font-bold transition-all group-hover:bg-[var(--color-surface)] peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary)]/5">
                                                {projectType}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="budget">
                                    Expected Budget Range
                                </label>
                                <select
                                    id="budget"
                                    value={formData.budget}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, budget: event.target.value }))}
                                    className="w-full appearance-none cursor-pointer border-b-2 border-x-0 border-t-0 border-[var(--color-border-strong)]/40 bg-transparent px-0 py-4 text-xl font-medium focus:border-[var(--color-primary)] focus:ring-0"
                                >
                                    <option value="10-25k">$10,000 — $25,000</option>
                                    <option value="25-50k">$25,000 — $50,000</option>
                                    <option value="50k+">$50,000+</option>
                                    <option value="undisclosed">Prefer not to say</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="description">
                                    Project Brief
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    required
                                    value={formData.description}
                                    onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                                    placeholder="Tell us about your goals, challenges, and timeline..."
                                    className="w-full resize-none border-b-2 border-x-0 border-t-0 border-[var(--color-border-strong)]/40 bg-transparent px-0 py-4 text-xl font-medium placeholder:text-[var(--color-border-strong)]/70 focus:border-[var(--color-primary)] focus:ring-0"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-8 pt-8 md:flex-row">
                                <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
                                    <span className="material-symbols-outlined text-[var(--color-primary)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        lock
                                    </span>
                                    <span className="text-sm font-medium">Privacy guaranteed. No spam, ever.</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-12 py-5 text-lg font-bold text-white transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-xl hover:shadow-[var(--color-primary)]/20 md:w-auto"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Launch Project'}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>

                            {message ? <p className="text-sm font-medium text-[var(--color-text-muted)]">{message}</p> : null}
                        </form>
                    </SectionShell>

                    <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            ['12+', 'Years Experience'],
                            ['200+', 'Projects Shipped'],
                            ['15', 'Design Awards'],
                            ['98%', 'Client Success'],
                        ].map(([value, label]) => (
                            <div key={label}>
                                <span className="font-headline block text-4xl font-bold text-[var(--color-text)]">{value}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">{label}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </main>

            <SiteFooter />
        </div>
    )
}
