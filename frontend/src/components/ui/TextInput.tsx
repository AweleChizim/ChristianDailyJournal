import type { JSX, InputHTMLAttributes } from "react";

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextInput({
  label,
  error,
  ...props
}: TextInputProps): JSX.Element {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="mb-1 block text-lg font-medium text-[#5E5A4F]"
      >
        {label}
      </label>

      <input
        {...props}
        className={`
          h-11
          w-full
          rounded-xl
          border
          border-[#5E5A4F]
          bg-white
          px-4
          text-lg
          outline-none
          transition
          focus:border-[#3E3A33]
          focus:ring-2
          focus:ring-[#DDD3BD]
          ${props.className ?? ""}
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}