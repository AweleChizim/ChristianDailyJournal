import "./JournalPage.css";

import PageHeader from "../components/common/PageHeader";
import EntryGroup from "../components/common/EntryGroup";
import EntryCard from "../components/common/EntryCard";

export default function JournalPage() {
    return (
        <div className="journal-page">

            <PageHeader
                title="Reflection & Prayer Journal"
            />

            <EntryGroup date="Today">

                <EntryCard
                    content={`Today reminded me to trust God's timing.

There were moments where I felt overwhelmed while working on Christian Daily Journal, but looking back I can already see how much progress has been made.

Lord, help me remain faithful in the small things and continue seeking You before every decision.`}
                />

            </EntryGroup>

            <EntryGroup date="15 July 2026">

                <EntryCard
                    content={`Thank You for guiding me through today's challenges.

Please continue giving me wisdom and patience as I grow both spiritually and professionally.`}
                />

            </EntryGroup>

            <EntryGroup date="14 July 2026">

                <EntryCard
                    content={`Father,

Thank You for Your grace.

Even when I cannot see the full picture, help me trust that You are working behind the scenes.`}
                />

            </EntryGroup>

        </div>
    );
}