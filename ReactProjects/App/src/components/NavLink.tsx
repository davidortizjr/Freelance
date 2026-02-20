interface NavLinkProps {
    icon: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export function NavLink({ icon, label, active = false, onClick }: NavLinkProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active
                ? 'bg-slate-100 text-primary font-medium'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}
