import { type ReactNode, type JSX } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({
  children,
}: CardProps): JSX.Element {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-2xl
        bg-white
        p-8
        shadow-xl
      "
    >
      {children}
    </div>
  );
}