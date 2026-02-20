export default function DashboardTab() {
    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                <div>
                    <h2 className="text-lg font-bold">Dashboard</h2>
                    <p className="text-xs text-slate-500">Overview of your support operations.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors">
                    Create Report
                </button>
            </header>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tickets Today</p>
                            <p className="text-3xl font-bold mt-2">38</p>
                            <p className="text-xs text-slate-500 mt-2">+6% vs yesterday</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Response</p>
                            <p className="text-3xl font-bold mt-2">1h 42m</p>
                            <p className="text-xs text-slate-500 mt-2">On track</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">CSAT</p>
                            <p className="text-3xl font-bold mt-2">94%</p>
                            <p className="text-xs text-slate-500 mt-2">+2% this week</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Activity</h3>
                        <p className="text-sm text-slate-500 mt-3">Select a date range to see ticket volume trends.</p>
                        <div className="mt-4 h-40 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                            Chart placeholder
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
