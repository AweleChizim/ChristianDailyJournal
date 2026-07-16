import "./EntryGroup.css";

interface EntryGroupProps {
    date: string;
    children: React.ReactNode;
}

export default function EntryGroup({
    date,
    children,
}: EntryGroupProps) {

    return (
        <section className="entry-group">
            <h2>{date}</h2>
            {children}
        </section>
    );
}