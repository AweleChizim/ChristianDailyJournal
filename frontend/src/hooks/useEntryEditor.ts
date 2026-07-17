import { useState } from "react";
import toast from "react-hot-toast";

import {
    updateEntry,
    type Entry,
} from "../api/entryApi";

export default function useEntryEditor(
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
) {

    const [editingEntry, setEditingEntry] =
        useState<Entry | null>(null);

    const [saving, setSaving] = useState(false);

    async function save(content: string) {

        if (!editingEntry) {

            return;

        }

        try {

            setSaving(true);

            const updatedEntry = await updateEntry(
                editingEntry.id,
                {
                    content,
                }
            );

            setEntries((previous) =>
                previous.map((entry) =>
                    entry.id === updatedEntry.id
                        ? updatedEntry
                        : entry
                )
            );

            toast.success("Entry updated.");

            setEditingEntry(null);

        } catch {

            toast.error("Unable to update entry.");

        } finally {

            setSaving(false);

        }

    }

    return {

        editingEntry,

        setEditingEntry,

        saving,

        save,

    };

}