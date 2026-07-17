import { useEffect, useState } from "react";
import { getTodayVerse } from "../../../services/verseService";
import { type Verse } from "../../../types/verse";
import "./VerseCard.css";

export default function VerseCard() {
    const [verse, setVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadVerse() {
            try {
                const data = await getTodayVerse();
                setVerse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadVerse();
    }, []);

    return (
        <section className="verse-card">
            <p className="bible-verse">
                Today's Verse
            </p>
            {loading ? (

                <p className="verse-text">
                    Loading today's verse...
                </p>

            ) : verse ? (
                <>

                    <p className="verse-text">
                        "{verse.text}"
                    </p>

                    <p className="verse-reference">
                        {verse.reference}
                    </p>
                </>

            ) : (

                <p className="verse-text">
                    Unable to load today's scripture.
                </p>

            )}

        </section>
    );
}