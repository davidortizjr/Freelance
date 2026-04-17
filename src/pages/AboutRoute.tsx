import { AboutPage } from '../components/about/AboutPage'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function AboutRoute() {
    return (
        <div className="app-shell">
            <SiteHeader variant="about" />
            <AboutPage />
            <SiteFooter />
        </div>
    )
}
