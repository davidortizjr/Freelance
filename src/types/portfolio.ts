export type ProjectId = 'etheric-os' | 'luminary' | 'vellum-estate' | 'studio-archive'

export type ProjectCard = {
    id: ProjectId
    title: string
    category: string
    year: string
    image: string
}

export type ProjectDetailStat = {
    value: string
    label: string
}

export type ProjectDetail = {
    label: string
    displayTitle: string
    heroTitle: string
    heroImage: string
    challenge: string
    quote: string
    solution: string[]
    stats: ProjectDetailStat[]
    client: string
    date: string
    services: string[]
    liveUrl: string
    gallery: string[]
    nextProject: ProjectId
}
