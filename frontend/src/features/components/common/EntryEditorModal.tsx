import { useEffect, useState } from "react";

import "./EntryEditorModal.css";

interface EntryEditorModalProps {
    open: boolean;
    initialContent: string;
    title: string;
    saving: boolean;
    onClose: () => void;
    onSave: (content: string) => void;
}

export default function EntryEditorModal({
    open,
    initialContent,
    title,
    saving,
    onClose,
    onSave,
}: EntryEditorModalProps) {

    const [content, setContent] = useState("");

    useEffect(() => {

        setContent(initialContent);

    }, [initialContent]);

    if (!open) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="editor-modal">

                <h2>{title}</h2>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="modal-actions">

                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-button"
                        disabled={saving}
                        onClick={() => onSave(content)}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>

                </div>

            </div>

        </div>

    );

}