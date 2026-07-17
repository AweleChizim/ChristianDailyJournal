import { Pencil, Trash2 } from "lucide-react";

import "./EntryCard.css";

interface EntryCardProps {
    content: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function EntryCard({
    content,
    onEdit,
    onDelete,
}: EntryCardProps) {
    return (
        <article className="entry-card">
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