import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      className="
        flex
        items-center
        gap-3
        rounded-full
        bg-primary
        px-5
        py-3
        shadow-md
      "
    >
      <Moon size={24} />
      <Sun size={24} />
    </button>
  );
}