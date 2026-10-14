import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { deleteEntry, getEntries, type Entry } from "../../api/entryApi";

import EntryCard from "../components/common/EntryCard";
import EntryGroup from "../components/common/EntryGroup";
import PageHeader from "../components/common/PageHeader";

import "./GratitudePage.css";
import formatEntryDate from "../../utils/formatEntryDate";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";
import useEntryEditor from "../../hooks/useEntryEditor";
import EntryEditorModal from "../components/common/EntryEditorModal";

export default function GratitudePage() {

    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const [deleting, setDeleting] = useState(false);
    const {editingEntry, setEditingEntry, saving, save } = useEntryEditor(setEntries);
    const [selectedDate, setSelectedDate] = useState("");
    const today = getLocalDateString();

    useEffect(() => {

        loadEntries();

    }, [selectedDate]);

    async function loadEntries() {

        try {

            const response = await getEntries("gratitude", selectedDate || undefined);

            setEntries(response);

        } catch {

            toast.error("Unable to load gratitude entries.");

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete() {
        if (!selectedEntry) {
            return;
        }
        try {
            setDeleting(true);
            await deleteEntry(selectedEntry.id);
            setEntries((previous) =>
                previous.filter(
                    (entry) => entry.id !== selectedEntry.id
                )
            );
            toast.success("Entry deleted.");
            setSelectedEntry(null);
        } catch {
            toast.error("Unable to delete entry.");
        } finally {
            setDeleting(false);
        }
    }
   
     function getLocalDateString() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
   
    const groupedEntries = entries.reduce(
        (groups: Record<string, Entry[]>, entry) => {

            if (!groups[entry.entry_date]) {

                groups[entry.entry_date] = [];

            }

            groups[entry.entry_date].push(entry);

            return groups;

        },
        {}
    );

    const sortedDates = Object.keys(groupedEntries).sort(
        (a, b) =>
            new Date(b).getTime() -
            new Date(a).getTime()
    );

    return (

        <div className="gratitude-page">
            <PageHeader
                title="Gratitude Journal"
                isFiltering={!!selectedDate}
                dateValue={selectedDate}
                maxDate={today}
                onDateChange={setSelectedDate}
                onClearFilter={() => setSelectedDate("")}
            />

            {loading ? (

                <p>Loading...</p>

            ) : sortedDates.length === 0 ? (

                <p>No gratitude entries yet.</p>

            ) : (

                sortedDates.map((date) => (

                    <EntryGroup
                        key={date}
                        date={formatEntryDate(date)}
                    >

                        {groupedEntries[date].map((entry) => (

                            <EntryCard
                                key={entry.id}
                                content={entry.content}
                                onEdit={() => setEditingEntry(entry)}
                                onDelete={() => setSelectedEntry(entry)}
                            />

                        ))}

                    </EntryGroup>

                ))

            )}
            <EntryEditorModal
                open={editingEntry !== null}
                title="Edit Gratitude Entry"
                initialContent={
                    editingEntry?.content ?? ""
                }
                saving={saving}
                onClose={() => setEditingEntry(null)}
                onSave={save}
            />

            <DeleteConfirmationModal
                open={selectedEntry !== null}
                loading={deleting}
                title="Delete Gratitude Entry"
                message="This action cannot be undone."
                onCancel={() => setSelectedEntry(null)}
                onConfirm={handleDelete}
            />
        </div>
    );

}