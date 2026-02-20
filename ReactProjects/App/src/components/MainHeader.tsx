import { DownloadButton } from './DownloadButton';
import { FiltersButton } from './FiltersButton';

export function MainHeader() {
    return (
        <div className="flex items-start justify-between mb-8">
            <div>
                <h2 className="text-3xl font-black tracking-tight">All Tickets</h2>
                <p className="text-slate-500 mt-1">Manage and track your customer support request efficiently.</p>
            </div>
            <div className="flex items-center gap-3">
                <FiltersButton />
                <DownloadButton />
            </div>
        </div>
    );
}