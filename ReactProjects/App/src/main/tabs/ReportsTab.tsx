export default function ReportsTab() {
    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                <div>
                    <h2 className="text-lg font-bold">Reports</h2>
                    <p className="text-xs text-slate-500">Export and review performance insights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">
                        Filters
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors">
                        Export CSV
                    </button>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Report Library</h3>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-semibold">Weekly Ticket Volume</p>
                                <p className="text-xs text-slate-500 mt-1">Last updated 2 hours ago</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-semibold">Response Time Breakdown</p>
                                <p className="text-xs text-slate-500 mt-1">Last updated yesterday</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-semibold">SLA Compliance</p>
                                <p className="text-xs text-slate-500 mt-1">Last updated this week</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-semibold">Customer Health</p>
                                <p className="text-xs text-slate-500 mt-1">Last updated 3 days ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Scheduled Exports</h3>
                        <p className="text-sm text-slate-500 mt-3">No scheduled exports yet.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
