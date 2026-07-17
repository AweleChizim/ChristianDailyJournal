import { CalendarDays, X } from "lucide-react";

import "./PageHeader.css";

interface PageHeaderProps {
    title: string;
    isFiltering?: boolean;
    onCalendarClick?: () => void;
    onClearFilter?: () => void;
}

export default function PageHeader({
    title,
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
                    >
                        <X size={18} />
                    </button>

                )}

                <button
                    className="calendar-button"
                    onClick={onCalendarClick}
                >
                    <CalendarDays size={30} />
                </button>

            </div>

        </div>

    );

}