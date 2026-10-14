
import { CalendarDays, X } from "lucide-react";
import "./PageHeader.css";

interface PageHeaderProps {
    title?: string;
    dateLabel?: string;
    dateValue?: string;
    maxDate?: string;
    onDateChange?: (date: string) => void;
    isFiltering?: boolean;
    onCalendarClick?: () => void;
    onClearFilter?: () => void;
}

export default function PageHeader({
    title,
    dateLabel,
    dateValue,
    maxDate,
    onDateChange,
    isFiltering = false,
    onCalendarClick,
    onClearFilter,
}: PageHeaderProps) {
    const hasNativeDatePicker =
        dateValue !== undefined && onDateChange !== undefined;

    return (
        <div
            className={`page-header ${
                title ? "" : "page-header--actions-only"
            }`}
        >
            {title && <h1>{title}</h1>}

            <div className="header-actions">
                {isFiltering && (
                    <button
                        type="button"
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

                {hasNativeDatePicker ? (
                    <div className="calendar-control">
                        <span
                            className="calendar-button calendar-visual"
                            aria-hidden="true"
                        >
                            <CalendarDays size={30} />
                        </span>

                        <input
                            className="calendar-native-input"
                            type="date"
                            value={dateValue}
                            max={maxDate}
                            onChange={(event) =>
                                onDateChange(event.target.value)
                            }
                            aria-label="Choose journal date"
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        className="calendar-button"
                        onClick={onCalendarClick}
                        aria-label="Choose date"
                    >
                        <CalendarDays size={30} />
                    </button>
                )}
            </div>
        </div>
    );
}
