import { NavLink } from './NavLink';

interface SidebarProps {
    activeNav?: string;
    onNavChange?: (navId: string) => void;
    user?: { fullName: string; role: string; avatarUrl?: string | null } | null;
}

export function Sidebar({ activeNav = 'dashboard', onNavChange, user }: SidebarProps) {
    const navItems = [
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { id: 'tickets', icon: 'confirmation_number', label: 'Tickets' },
        { id: 'reports', icon: 'bar_chart', label: 'Reports' },
        { id: 'customers', icon: 'group', label: 'Customers' }
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-500 rounded-lg p-2 text-white flex items-center">
                    <span className="material-symbols-outlined text-2xl">
                        confirmation_number
                    </span>
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none">SupportDesk</h1>
                    <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeNav === item.id}
                        onClick={() => onNavChange?.(item.id)}
                    />
                ))}
            </nav>
            <div className="p-4 border-t border-slate-200 space-y-2">
                <NavLink
                    icon="settings"
                    label="Settings"
                    active={activeNav === 'settings'}
                    onClick={() => onNavChange?.('settings')}
                />
                <div className="flex items-center gap-3 px-3 py-4">
                    <div
                        className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
                        data-alt="Avatar of the current admin user"
                        style={
                            user?.avatarUrl
                                ? { backgroundImage: `url('${user.avatarUrl}')` }
                                : undefined
                        }
                    ></div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate">{user?.fullName || 'Unknown User'}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.role || 'User'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
