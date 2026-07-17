import { useState } from "react";
import toast from "react-hot-toast";
import Greeting from "./components/Greeting";
import VerseCard from "./components/VerseCard";
import DashboardCard from "./components/DashboardCard";
import { createEntry } from "../../api/entryApi";
import { getUser } from "../../api/authApi";


import "./DashboardPage.css";

export default function DashboardPage() {
    const [gratitude, setGratitude] = useState("");
    const [journal, setJournal] = useState("");
    const [savingGratitude, setSavingGratitude] = useState(false);
    const [savingJournal, setSavingJournal] = useState(false);
    const user = getUser();
    
    async function handleSaveGratitude() {
        if (!gratitude.trim()) {
            toast.error("Please write something first.");
             return;
        }

        try {
            setSavingGratitude(true);
            await createEntry({
                entry_type: "gratitude",
                content: gratitude,
            });
            toast.success("Gratitude saved.");
            setGratitude("");
        } catch {
            toast.error("Unable to save gratitude.");
        } finally {
            setSavingGratitude(false);
        }
    }
    async function handleSaveJournal() {
        if (!journal.trim()) {
            toast.error("Please write something first.");
            return;
        }
        try {
            setSavingJournal(true);
            await createEntry({
                entry_type: "journal",
                content: journal,
            });
            toast.success("Journal entry saved.");
            setJournal("");
        } catch {
            toast.error("Unable to save journal.");
        } finally {
            setSavingJournal(false);
        }
    }

    return (
    <div className="dashboard">

          <Greeting firstName={user?.first_name ?? ""} />

          <section className="dashboard-row">

              <DashboardCard
                  title="Today's Gratitude"
              >

                    <textarea
                      placeholder="What are you thankful for today?"
                      className="dashboard-textarea"
                      value={gratitude}
                      onChange={(e) => setGratitude(e.target.value)}
                     />

                  <button 
                        className="save-button"
                        onClick={handleSaveGratitude}
                        disabled={savingGratitude}
                    >
                        {savingGratitude ? "Saving..." : "Save"}
                    </button>

              </DashboardCard>

              <VerseCard />

          </section>

          <section className="journal-section">

              <DashboardCard
                  title="Reflection & Prayer"
              >

                  <textarea
                      placeholder="Reflect on your day..."
                      className="dashboard-textarea journal"
                      value={journal}
                      onChange={(e) => setJournal(e.target.value)}
                  />

                  <button className="save-button"
                      onClick={handleSaveJournal}
                      disabled={savingJournal}
                  >
                      {savingJournal ? "Saving..." : "Save"}
                  </button>

              </DashboardCard>

          </section>

      </div>
    );
}