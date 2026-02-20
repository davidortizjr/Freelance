import { SearchBar } from './SearchBar';
import { NotificationButton } from './NotificationButton';
import { AccountButton } from './AccountButton';
import { TicketButton } from './TicketButton';

interface HeaderProps {
    onSearch?: (value: string) => void;
    onNotificationClick?: () => void;
    onSignOut?: () => void;
    onCreateClick?: () => void;
    hasNotifications?: boolean;
}

export function Header({
    onSearch,
    onNotificationClick,
    onSignOut,
    onCreateClick,
    hasNotifications = true,
}: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <SearchBar onChange={onSearch} />
            </div>
            <div className="flex items-center gap-4">
                <NotificationButton
                    onClick={onNotificationClick}
                    hasNotifications={hasNotifications}
                />
                <AccountButton onSignOut={onSignOut} />
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <TicketButton onClick={onCreateClick} />
        </header>
    );
}
