interface SearchBarProps {
    placeholder?: string;
    onChange?: (value: string) => void;
}

export function SearchBar({
    placeholder = 'Search tickets, customers, or internal notes...',
    onChange,
}: SearchBarProps) {
    return (
        <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
            </span>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full bg-slate-100 pl-10 pr-4 py-2 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400"
            />
        </div>
    );
}
