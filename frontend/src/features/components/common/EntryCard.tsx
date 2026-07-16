import { Pencil, Trash2 } from "lucide-react";

import "./EntryCard.css";

interface EntryCardProps {
    content: string;
    compact?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function EntryCard({
    content,
    compact = false,
    onEdit,
    onDelete,
}: EntryCardProps) {
    return (
        <article className={`entry-card ${compact ? "compact" : ""}`}>
            <p>{content}</p>
            <div className="entry-actions">
                <button onClick={onEdit}>
                    <Pencil size={18} />
                </button>
                <button                 
                    className="delete"                   
                    onClick={onDelete}            
                 >
                    <Trash2 size={18} />
                </button>
            </div>
        </article>
    );
}