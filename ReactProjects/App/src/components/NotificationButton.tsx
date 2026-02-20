interface NotificationButtonProps {
    onClick?: () => void;
    hasNotifications?: boolean;
}

export function NotificationButton({
    onClick,
    hasNotifications = true,
}: NotificationButtonProps) {
    return (
        <button
            onClick={onClick}
            className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 relative transition-colors"
        >
            <span className="material-symbols-outlined">notifications</span>
            {hasNotifications && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            )}
        </button>
    );
}
