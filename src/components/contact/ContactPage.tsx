import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '../design/Container'
import { SectionShell } from '../design/SectionShell'
import { PageTitleHeader } from '../about/PageTitleHeader'

type ContactPayload = {
    name: string
    email: string
    subject: 'Project Inquiry' | 'Speaking Engagement' | 'Partnership' | 'Other'
    message: string
}

const initialState: ContactPayload = {
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
}

export function ContactPage() {
    const [formData, setFormData] = useState<ContactPayload>(initialState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setMessage(null)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Unable to submit message')
            }

            setMessage('Message sent successfully. We will get back to you shortly.')
            setFormData(initialState)
        } catch {
            setMessage('Submission failed. Please try again in a moment.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="pt-32">
            <PageTitleHeader
                eyebrow="Get in Touch"
                title="Let's curate your next vision."
                description="Whether you are starting a new venture or refining an existing masterpiece, our doors and inboxes are always open."
                className="mb-24"
            />

            <section className="mb-32">
                <Container>
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="rounded-xl bg-white p-8 shadow-[0_32px_64px_-12px_rgba(0,65,200,0.06)] sm:p-12 lg:col-span-7">
                            <h2 className="font-headline mb-10 text-3xl font-bold tracking-tight">Inquiry form</h2>
                            <form className="space-y-8" onSubmit={onSubmit}>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="contact-name">
                                            Full Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                                            className="border-b border-[var(--color-border-strong)] bg-transparent py-3 focus:border-[var(--color-primary)] focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="contact-email">
                                            Email Address
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            placeholder="hello@studio.com"
                                            value={formData.email}
                                            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                                            className="border-b border-[var(--color-border-strong)] bg-transparent py-3 focus:border-[var(--color-primary)] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="contact-subject">
                                        Subject
                                    </label>
                                    <select
                                        id="contact-subject"
                                        value={formData.subject}
                                        onChange={(event) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                subject: event.target.value as ContactPayload['subject'],
                                            }))
                                        }
                                        className="appearance-none border-b border-[var(--color-border-strong)] bg-transparent py-3 focus:border-[var(--color-primary)] focus:outline-none"
                                    >
                                        <option>Project Inquiry</option>
                                        <option>Speaking Engagement</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" htmlFor="contact-message">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={4}
                                        required
                                        placeholder="Tell us about your project..."
                                        value={formData.message}
                                        onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                                        className="resize-none border-b border-[var(--color-border-strong)] bg-transparent py-3 focus:border-[var(--color-primary)] focus:outline-none"
                                    />
                                </div>

                                <button
                                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-12 py-5 text-lg font-black text-white transition-opacity hover:opacity-90 md:w-auto"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>

                                {message ? <p className="text-sm text-[var(--color-text-muted)]">{message}</p> : null}
                            </form>
                        </div>

                        <div className="flex flex-col gap-8 lg:col-span-5">
                            <div className="flex-1 rounded-xl bg-[var(--color-surface-muted)] p-10">
                                <div className="flex h-full flex-col justify-between">
                                    <div>
                                        <span className="material-symbols-outlined mb-6 text-4xl text-[var(--color-primary)]">location_on</span>
                                        <h3 className="font-headline mb-4 text-2xl font-bold">Our Studio</h3>
                                        <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
                                            742 Editorial Avenue
                                            <br />
                                            Design District, NY 10013
                                            <br />
                                            United States
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <a className="flex items-center gap-2 font-bold text-[var(--color-primary)] transition-opacity hover:opacity-70" href="#">
                                            View on Map
                                            <span className="material-symbols-outlined">north_east</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="rounded-xl bg-[#e5e2e1] p-8">
                                    <span className="material-symbols-outlined mb-4 text-[var(--color-primary)]">alternate_email</span>
                                    <h4 className="font-headline text-lg font-bold">Email us</h4>
                                    <p className="text-[var(--color-text-muted)]">hello@thecurator.com</p>
                                </div>
                                <div className="rounded-xl bg-[#e5e2e1] p-8">
                                    <span className="material-symbols-outlined mb-4 text-[var(--color-primary)]">call</span>
                                    <h4 className="font-headline text-lg font-bold">Call us</h4>
                                    <p className="text-[var(--color-text-muted)]">+1 (212) 555-0198</p>
                                </div>
                            </div>

                            <div className="rounded-xl bg-[var(--color-text)] p-10 text-[var(--color-surface)]">
                                <h4 className="font-headline mb-6 text-xl font-bold">Digital Presence</h4>
                                <div className="flex flex-wrap gap-4">
                                    {['Instagram', 'LinkedIn', 'Twitter', 'Behance'].map((item) => (
                                        <a
                                            key={item}
                                            className="rounded-full border border-white/20 px-6 py-2 text-sm transition-colors hover:bg-white hover:text-[var(--color-text)]"
                                            href="#"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <SectionShell tone="muted" className="!py-0">
                <div className="py-24 sm:py-32">
                    <Container>
                        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
                            <div>
                                <h2 className="font-headline mb-6 text-5xl font-black leading-tight tracking-[-0.08em]">Architectural Insights</h2>
                                <p className="mb-8 max-w-lg text-xl leading-relaxed text-[var(--color-text-muted)]">
                                    A monthly curation of design philosophy, project previews, and creative methodology delivered straight to your inbox.
                                </p>
                                <form className="flex max-w-md flex-col gap-4 sm:flex-row">
                                    <input
                                        className="flex-1 rounded-full bg-white px-6 py-4 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                                        type="email"
                                        placeholder="Email address"
                                    />
                                    <button className="rounded-full bg-[var(--color-primary)] px-8 py-4 font-bold text-white" type="button">
                                        Subscribe
                                    </button>
                                </form>
                                <p className="mt-4 text-sm text-[var(--color-text-muted)] opacity-70">Join 5,000+ other curators. No spam, ever.</p>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[var(--color-surface-soft)] shadow-2xl">
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Modern minimalist office interior"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fzAbmrbt2YellI14xgZmZwdwGDTzHeh2xBiXIpKyBZn4yxzaNosa5HkLSEjpD_yBUyacXkUbi6-HcBu8qawTrfi1gHr5c6Dlan38LoQNIhUq_JJZ1LmwDZg2V2UstCRE8kQ8T5z9DLnY15C3QW-EM9SXyXDh7TOBYIPvAFHO-kBIawP2WUdRAWgyrsMuTAUwiy_rUSgKPfuIurSxNVQ-PNXLGbU4v6Fkhgnl72evyzUl23Crdd2jB7D0Cvtd78mo9-BZ5tyj4QPL"
                                    />
                                </div>
                                <div className="absolute -bottom-8 -left-8 hidden rounded-xl bg-[var(--color-primary)] p-10 text-white shadow-[0_32px_64px_-12px_rgba(0,65,200,0.18)] md:block">
                                    <p className="font-headline text-3xl font-black tracking-[-0.06em]">EST. 2018</p>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] opacity-80">New York City</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </SectionShell>

            <section className="bg-zinc-900 py-24 text-white sm:py-32">
                <Container>
                    <div className="mx-auto max-w-5xl text-center">
                        <h2 className="font-headline mb-12 text-5xl font-black tracking-[-0.08em] md:text-7xl lg:text-8xl">Ready to Curate?</h2>
                        <div className="flex flex-col justify-center gap-6 md:flex-row">
                            <Link
                                to="/start-project"
                                className="rounded-full bg-[var(--color-primary)] px-12 py-5 text-lg font-bold transition-opacity hover:opacity-90"
                            >
                                Start a Conversation
                            </Link>
                            <Link
                                to="/#portfolio"
                                className="rounded-full border border-white/20 px-12 py-5 text-lg font-bold transition-colors hover:bg-white/10"
                            >
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
