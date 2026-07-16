import Greeting from "./components/Greeting";
import VerseCard from "./components/VerseCard";
import DashboardCard from "./components/DashboardCard";
import "./DashboardPage.css";

export default function DashboardPage() {
    return (
        <div className="dashboard">

          <Greeting firstName="Awele" />

          <section className="dashboard-row">

              <DashboardCard
                  title="Today's Gratitude"
              >

                  <textarea
                      placeholder="What are you thankful for today?"
                      className="dashboard-textarea"
                  />

                  <button className="save-button">
                      Save
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
                  />

                  <button className="save-button">
                      Save
                  </button>

              </DashboardCard>

          </section>

      </div>
    );
}