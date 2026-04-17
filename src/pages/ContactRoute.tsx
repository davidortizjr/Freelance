import { ContactPage } from '../components/contact/ContactPage'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function ContactRoute() {
    return (
        <div className="app-shell">
            <SiteHeader variant="about" />
            <ContactPage />
            <SiteFooter />
        </div>
    )
}
