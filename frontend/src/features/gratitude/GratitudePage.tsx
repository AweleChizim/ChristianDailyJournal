import EntryCard from "../components/common/EntryCard";
import EntryGroup from "../components/common/EntryGroup";
import PageHeader from "../components/common/PageHeader";
import "./GratitudePage.css";


export default function GratitudePage() {
    return (
        <div className="gratitude-page">

            <PageHeader
                title="Grateful Journal"
            />

            <EntryGroup date="Today">

                <EntryCard
                    compact
                    content="I am grateful for waking up healthy and having another opportunity to grow closer to God."
                />

                <EntryCard
                    compact
                    content="I'm thankful for the progress I've made on Christian Daily Journal today."
                />

            </EntryGroup>

            <EntryGroup date="15 July 2026">

                <EntryCard
                    compact
                    content="Thank You Lord for my family and friends."
                />

            </EntryGroup>

            <EntryGroup date="14 July 2026">

                <EntryCard
                    compact
                    content="Thank You for giving me strength during difficult moments."
                />

            </EntryGroup>

        </div>
    );
}