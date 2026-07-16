interface GreetingProps {
    firstName: string;
}

export default function Greeting({
    firstName,
}: GreetingProps) {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 18
            ? "Good afternoon"
            : "Good evening";

    return (
        <div>

            <h1
                style={{
                    fontFamily: "Lora",
                    fontSize: "3rem",
                    fontWeight: 400,
                    color: "#11120D",
                    marginBottom: "16px",
                }}
            >
                {greeting}, {firstName}
            </h1>

        </div>
    );
}