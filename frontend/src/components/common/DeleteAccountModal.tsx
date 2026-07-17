import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { deleteAccount, removeToken, deleteGoogleAccount } from "../../api/authApi";

import "./DeleteAccountModal.css";
import GoogleButton from "../ui/GoogleButton";

interface DeleteAccountModalProps {
    open: boolean;
    onClose: () => void;
}

export default function DeleteAccountModal({
    open,
    onClose,
}: DeleteAccountModalProps) {

    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user")!
    );

    const isGoogleUser = user.provider === "google";

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    if (!open) {

        return null;

    }

    async function handleDelete() {

        try {

            setLoading(true);

            await deleteAccount(password);

            removeToken();

            toast.success(
                "Account deleted successfully."
            );

            navigate("/login");

        } catch (error: any) {

            toast.error(
                error.response?.data?.detail ??
                "Unable to delete account."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleGoogleDelete(
        credential: string,
    ): Promise<void> {

        try {

            await deleteGoogleAccount(
                credential,
            );

            removeToken();

            localStorage.removeItem(
                "user",
            );

            toast.success(
                "Account deleted successfully.",
            );

            navigate(
                "/login",
            );

        } catch {

            toast.error(
                "Unable to delete account.",
            );

        }

    }

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>
                    Delete Account
                </h2>

                <p>
                    This action cannot be undone.
                    All of your journal and gratitude entries will be permanently deleted.
                </p>

                {!isGoogleUser && (
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                )}
                {isGoogleUser && (
                    <GoogleButton
                        onSuccess={handleGoogleDelete}
                    />
                )}

                <div className="modal-actions">

                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-button"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete Account"}
                    </button>

                </div>

            </div>

        </div>

    );

}