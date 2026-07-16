import "./DashboardCard.css";

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function DashboardCard({
    title,
    children,
    className = "",
}: DashboardCardProps) {
    return (
        <section className={`dashboard-card ${className}`}>
            <h2 className="dashboard-card-title">
                {title}
            </h2>

            <div className="dashboard-card-content">
                {children}
            </div>
        </section>
    );
}