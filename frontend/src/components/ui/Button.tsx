import type { JSX, ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className="
        w-full
        rounded-xl
        bg-[#5E5A4F]
        py-3
        text-xl
        font-medium
        text-white
        shadow-md
        transition
        hover:opacity-90
      "
    >
      {children}
    </button>
  );
}