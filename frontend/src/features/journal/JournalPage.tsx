import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { deleteEntry, getEntries, type Entry } from "../../api/entryApi";

import PageHeader from "../components/common/PageHeader";
import EntryGroup from "../components/common/EntryGroup";
import EntryCard from "../components/common/EntryCard";

import formatEntryDate from "../../utils/formatEntryDate";

import "./JournalPage.css";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";
import useEntryEditor from "../../hooks/useEntryEditor";
import EntryEditorModal from "../components/common/EntryEditorModal";

export default function JournalPage() {

    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const [deleting, setDeleting] = useState(false);
    const { editingEntry, setEditingEntry, saving, save } = useEntryEditor(setEntries);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState("");
    
    
    useEffect(() => {

        loadEntries();

    }, [selectedDate]);
    

    async function loadEntries() {

        try {

            const response = await getEntries("journal", selectedDate || undefined);

            setEntries(response);

        } catch {

            toast.error("Unable to load journal entries.");

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

        <div className="journal-page">
            <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ display: "none" }}
            />
            <PageHeader
                title="Reflection & Prayer Journal"
                isFiltering={!!selectedDate}
                onCalendarClick={() => dateInputRef.current?.showPicker()}
                onClearFilter={() => setSelectedDate("")}
            />

            {loading ? (

                <p>Loading...</p>

            ) : sortedDates.length === 0 ? (

                <p>No journal entries yet.</p>

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
                title="Edit Journal Entry"
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
                title="Delete Journal Entry"
                message="This action cannot be undone."
                onCancel={() => setSelectedEntry(null)}
                onConfirm={handleDelete}
            />
        </div>
    );

}