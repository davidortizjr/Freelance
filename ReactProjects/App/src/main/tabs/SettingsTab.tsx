export default function SettingsTab() {
    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                <div>
                    <h2 className="text-lg font-bold">Settings</h2>
                    <p className="text-xs text-slate-500">Manage workspace preferences and defaults.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                </button>
            </header>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Workspace</h3>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="text-sm font-medium text-slate-600">
                                Default SLA (hours)
                                <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" defaultValue="24" />
                            </label>
                            <label className="text-sm font-medium text-slate-600">
                                Working Hours
                                <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" defaultValue="09:00 - 18:00" />
                            </label>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Notifications</h3>
                        <div className="mt-4 space-y-3">
                            <label className="flex items-center gap-3 text-sm text-slate-600">
                                <input type="checkbox" className="size-4" defaultChecked />
                                Email alerts for urgent tickets
                            </label>
                            <label className="flex items-center gap-3 text-sm text-slate-600">
                                <input type="checkbox" className="size-4" />
                                Daily summary reports
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
