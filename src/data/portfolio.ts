import type { ProjectCard, ProjectDetail, ProjectId } from '../types/portfolio'

export const projects: ProjectCard[] = [
    {
        id: 'etheric-os',
        title: 'Etheric OS',
        category: 'Digital Product Design',
        year: '2024',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FhtCSUYpsbxL3pGs7nFrWMyesMJUu0j_LDFXTewa9la2vY0NLGaaLqtP6UTmPY7eFMDm02K6qjrdm7pJIDWl32Ke1OI59P8u2AjjKC1-DXwP5WzTQ6zEAeCk82jmCJRDMik7RzG0JAWN7Yt9nI8WKRCEGjb5HG5pUEO2yy7F2pVQvSgmQF5BZbOAmCo1fsutj5_U3jG8OuPZyDlgxTPmJmRyj_jOyjzlez1nGBcKelSgfftPtpiODA4tyfLTkJ1VZjnkoJr02P2g',
    },
    {
        id: 'luminary',
        title: 'Luminary',
        category: 'Brand Identity',
        year: '',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuATkZveDObSQNnZ62FZmLaELZJHYKl5_Q6O9kU2KXEV_-abceo67nk9MuPz-1OKpdm2iDi6JYkeSDFo5S-8GB9dkpoT5vbbo7xEJ4xbmJdeYty6X60zTKgs8bvqGbLsStDb3BMLsAgojfXy3hZrYDtKSgmmjUa3XvpJs7EaB_Pj6hR8D55wH9CSITZkQARtaHpaF4gpLD0M-ZfCmxM67dDtwOXCT30DpPNQK5xtGEXlgIsnA_c2VXak7SHekGvMXPB4AAMIcqKeYtZ4',
    },
    {
        id: 'vellum-estate',
        title: 'Vellum Estate',
        category: 'Web Experience',
        year: '',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBBqG95frfGSO7JyW8SKllGMWYyMLWMYJF1GiT6ZhRFcxz-ZZMjY9vSkcdhWKkks6_hjmFjWJ-AHjfK8dg8gQhmAgPCPZitrD66qi67jzJWhO3xKtA_e_LGUFGENnD8GGHV302gkGoS6-19DpipiRtVBS9l6ETe5ZBuJ9AsziCBSi_YCwC9PsDiX3Ozkm_AiD9syogRIpxK5n65LLoU6ZJIRAeL3mU2xgmaF0TyznFE-oT44RO8xW1ZNqVT6FcUV1-uXcKJSK1SSpSK',
    },
    {
        id: 'studio-archive',
        title: 'Studio Archive',
        category: 'Curation & Strategy',
        year: '',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBzOZjZZ7j4jIf8P68gBGqBOOKK7TxuGfuY4D457Ym-hrtixxcS9ehV8Lm-3lLZW-r8nrzLDec99KLEUGeWIsWYy2Bl_HhuQrwQD-iiw9LNKIEvCMLoBInrnuAheToolkUWNfwlLZTKFD2G2r0ccwsmk7zvx5s1vyUppr7GD3OldU7xe5_vMz86hQvK13ubswZQQFGSAZmycA6_EfV7VH02ZHw1hIm94vLic2HvWJfTPeihv2Pn6seTotRtQPGHsobXY0CK0bN20h',
    },
]

const detailImageSet = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYKjipMoXtksp7SmC-xc83Kq99JzhpyG6BqdVF9T2elz4FeuxhL1BippPMbIwce1-E0M0UiLhiBY3xfLre3RONPqMyL__-KACDtT0pbDgQ4Uz7Tk_vcp0GHM1V5c5bZ17JYMD0YEq4uL7qSCrPK2uN-MTlpezNpxaUJr5sNsCC9xSCLZMunnG9RflFBOMTKzSsMWMymeBEPSBVjF_XmxoVwRxbwtPfT_qPJ3SqX35yirtRIFURb0PvFmfs3R0FeXTllU9xDVw4AlZ9',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDzS49NqnLYYmfmKeEO_Zn_0imL7bvuAi-DtLo25LGX3lQeVJK6CD9f9p2lkLqv0hdNvMaZgPJT3dIKRBzAPGKBIk6rNtms5is8qBSrU2zYYuALx3oywIFbH3cKcCcB5DcSlL8S10IFmxl8iMrKBq4AFbL_vzPlOErLnqrgBVERhsK4gkv7JYBDibemlwyMZmax4_CYtGFvcFYBl4AUjZ4uxA9B3mm3fpsI5U5lmRNIqIG4rVqtIl-QZuXZOEfvTa-h0L1lZww1NCWA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDkL0fKLSNKZBzHaLvxF2tzCwaV88WTrb17tb2pXGShTnCvAUfGqgRU-jUHPxA1vmjfMxGQPJH2UKGiexQj1RV1W0CpEBIwlRVYg0CmryPgmMN0umn3e1lQ_8pu2Oc2CKBan9kEonFdwtScmDE6JbgLyP9dRUtKLeJ8-gYVn0M1ReLyRErFmb1zRSvG3tbRRAtEpfWPo8UF_QEmDWSAzx-4O18tPnDG8o0qzvL6VlNVjRMpTzLe0kcRXKG31Z7Ykig0ULn_DAJOfshp',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCA9V868hXNlGMFMXqdoprGoSr5Ce_1_sJHnLpiFn5l476ahGtXLOosr8E70yjULDKCmLJx-UqzKC16X658HTyQHrfRuPDmTRuu_lOL1gJX60zp0MBjo2bBqWFfUXYGnSK4qHy66OMettxR51kgTzzm4d6AKNIRzn4p9dAjqCUADyP_1vX9i0Kh9PLqqBlRRg7GsPJpffAxGSxSdzoabS4SZun6RYRYZKegvKnT2YJIsi4vDDp7xFHCymtgjjwjWYsN_47JLRg-3YaZ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA4JrMj7ujGZNYSOTfesgptUWQI37hawnPDLL-066_co8frHtDJnEjaKB0ui2Sn8a7CXY_y_uzwnsm0Nr6rDUpQqHoWXa5NG3WkXa2OJiKvUjh-uscQXiJR7GPE09WAg-1t6-PUb-FcK80ApCazquPTOXkLT6j6u2iEeqUXNyS6sLpP7NgNA-vgHUrgpq01bGY9r_poRG_BFKAz-ri5f7AnqJeJSYbKeZSJ7-R0ydpADxZF7fV3UuMjTJGfWarGs3brE-fOjIrYpziN',
] as const

const createDetail = (
    displayTitle: string,
    heroTitle: string,
    challenge: string,
    quote: string,
    solution: string[],
    stats: ProjectDetail['stats'],
    client: string,
    date: string,
    services: string[],
    nextProject: ProjectId,
): ProjectDetail => ({
    label: 'Case Study — 2024',
    displayTitle,
    heroTitle,
    heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDEJ1ezhyOgZTyybFAHGF204KWpq6Tj8NRYBcD5DJQ6FWXmvAb3IYMBhLHzO0U-JI-Pi7gNRyoC4j4jXPb7wB6CasNAHN-woWS96Tu6ShUS7RMOS8eLGRCFDwyPbxb9lbcRQ2BgXJJRVJihSeQF954_gwUXnXxStciEvq7akEheQ7QCPkok_Bw3yUwHkAI4G5b45oqnj4ZXr8VuWBXtIPauMoD4Q2z8fO1PdY8BLIaiwXlqznPZefg80-OdWcZkWcJvaVoOTzR0ix4U',
    challenge,
    quote,
    solution,
    stats,
    client,
    date,
    services,
    liveUrl: 'https://example.com',
    gallery: [...detailImageSet],
    nextProject,
})

export const projectDetails: Record<ProjectId, ProjectDetail> = {
    'etheric-os': createDetail(
        'ETHERIC\nDIGITAL ARCHIVE',
        'Etheric OS',
        'How do you preserve the ephemeral nature of light art in a permanent digital space? Our client needed a repository that felt as immersive as the physical installations themselves, without sacrificing performance or accessibility.',
        'The intersection of physical sensation and digital representation was our primary frontier.',
        [
            'We engineered a custom interaction layer that keeps the archive cinematic while remaining fast on lower-powered devices.',
            'The interface acts as a silent curator, using high-contrast typography and deliberate negative space to let the work breathe.',
        ],
        [
            { value: '240%', label: 'Increase in Engagement' },
            { value: '0.8s', label: 'Average Load Time' },
            { value: 'Gold', label: 'Awwwards SOTD' },
        ],
        'Lumina Arts Foundation',
        'October 2024',
        ['Creative Direction', 'WebGL Development', 'UI/UX Design', 'Motion Graphics'],
        'luminary',
    ),
    luminary: createDetail(
        'LUMINA\nDIGITAL ARCHIVE',
        'Luminary',
        'How do you translate a refined identity system into a space that feels editorial, tactile, and immediate on every screen size?',
        'The interface needed to feel like an exhibition wall, not a generic marketing site.',
        [
            'We built a focused case-study structure that pairs oversized typography with image-led storytelling.',
            'A restrained visual system keeps the attention on the work while still leaving room for motion and interaction.',
        ],
        [
            { value: '180%', label: 'Time on Page' },
            { value: '1.1s', label: 'Average Load Time' },
            { value: 'A+', label: 'Accessibility Score' },
        ],
        'Luminary Studio',
        'September 2024',
        ['Creative Direction', 'Brand System', 'Web Design', 'Frontend Development'],
        'vellum-estate',
    ),
    'vellum-estate': createDetail(
        'VELLUM\nESTATE',
        'Vellum Estate',
        'How do you present a luxury property experience online without flattening the atmosphere into a standard brochure site?',
        'The site needed to feel spacious, quiet, and cinematic from the first interaction.',
        [
            'We organized the page around image rhythm, generous spacing, and a tight hierarchy for the core story.',
            'The resulting experience keeps the brand premium while still performing like a modern product site.',
        ],
        [
            { value: '96%', label: 'Mobile Satisfaction' },
            { value: '0.9s', label: 'Average Load Time' },
            { value: '32%', label: 'Lead Growth' },
        ],
        'Vellum Properties',
        'July 2024',
        ['Art Direction', 'Content Strategy', 'Web Design', 'Development'],
        'studio-archive',
    ),
    'studio-archive': createDetail(
        'STUDIO\nARCHIVE',
        'Studio Archive',
        'How do you bring together editorial curation, process documentation, and a compact brand system without overwhelming the viewer?',
        'The portfolio had to feel archived, but never static.',
        [
            'We used a modular case-study structure that keeps the narrative clear while leaving room for visual discovery.',
            'The page balances utility and atmosphere, which makes it easy to understand the work without losing character.',
        ],
        [
            { value: '4.8x', label: 'Return Visits' },
            { value: '1.0s', label: 'Average Load Time' },
            { value: '100%', label: 'Responsive Coverage' },
        ],
        'Studio Archive',
        'May 2024',
        ['Information Architecture', 'Design Systems', 'Frontend Development', 'Editorial Layout'],
        'etheric-os',
    ),
}
