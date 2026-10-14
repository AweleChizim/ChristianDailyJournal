import { CalendarDays, X } from "lucide-react";

import "./PageHeader.css";

interface PageHeaderProps {
    title?: string;
    dateLabel?: string;
    isFiltering?: boolean;
    onCalendarClick?: () => void;
    onClearFilter?: () => void;
}

export default function PageHeader({
    title,
    dateLabel,
    isFiltering = false,
    onCalendarClick,
    onClearFilter,
}: PageHeaderProps) {

    return (

        <div className="page-header">

            <h1>{title}</h1>

            <div className="header-actions">

                {isFiltering && (

                    <button
                        className="clear-filter-button"
                        onClick={onClearFilter}
                        aria-label="Clear date filter"
                    >
                        <X size={18} />
                    </button>

                )}

                {dateLabel && (
                    <span className="header-date-label">
                        {dateLabel}
                    </span>
                )}

                <button
                    className="calendar-button"
                    onClick={onCalendarClick}
                    aria-label="Choose date"
                >
                    <CalendarDays size={30} />
                </button>

            </div>

        </div>

    );

}