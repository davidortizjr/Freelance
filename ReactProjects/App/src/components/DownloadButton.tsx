export function DownloadButton() {
    return (
        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <span className="material-symbols-outlined">download</span>
            Export
        </button>
    );
}