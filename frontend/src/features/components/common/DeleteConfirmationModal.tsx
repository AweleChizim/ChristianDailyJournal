import "./DeleteConfirmationModal.css";

interface DeleteConfirmationModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({
    open,
    loading,
    title,
    message,
    onCancel,
    onConfirm,
}: DeleteConfirmationModalProps) {

    if (!open) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-actions">

                    <button
                        className="secondary-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-button"
                        disabled={loading}
                        onClick={onConfirm}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>

    );

}