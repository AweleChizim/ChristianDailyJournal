import { CalendarDays } from "lucide-react";
import "./PageHeader.css";

interface PageHeaderProps {
    title: string;
    onCalendarClick?: () => void;
}

export default function PageHeader({
    title,
    onCalendarClick,
}: PageHeaderProps) {
    return (
        <div className="page-header">

            <h1>{title}</h1>

            <button
                className="calendar-button"
                onClick={onCalendarClick}
            >
                <CalendarDays size={30} />
            </button>

        </div>
    );
}