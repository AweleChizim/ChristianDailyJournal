
export default function Header() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  const firstName = "John";

  return (
    <header className="flex justify-between items-start px-8 pt-8">
      <div>
        <h1 className="text-5xl font-display">
          {greeting}, {firstName}
        </h1>

        <p className="mt-3 text-lg italic">
          Psalm 69:30 —
          <br />
          I will praise God's name in song...
        </p>
      </div>
    </header>
  );
}