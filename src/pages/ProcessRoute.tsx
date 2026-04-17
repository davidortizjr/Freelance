import { ProcessPage } from '../components/about/ProcessPage'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function ProcessRoute() {
    return (
        <div className="app-shell">
            <SiteHeader variant="about" />
            <ProcessPage />
            <SiteFooter />
        </div>
    )
}
