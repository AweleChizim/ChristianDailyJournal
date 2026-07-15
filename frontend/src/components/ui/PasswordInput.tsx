import { useState } from "react";
import type { JSX, InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInput({
  label,
  error,
  ...props
}: PasswordInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="mb-2 block text-lg font-medium text-[#5E5A4F]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`
            h-11
            w-full
            rounded-xl
            border
            border-[#5E5A4F]
            bg-white
            px-4
            pr-12
            text-lg
            outline-none
            transition
            focus:border-[#3E3A33]
            focus:ring-2
            focus:ring-[#DDD3BD]
          ${props.className ?? ""}
        `}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-xl
            text-[#5E5A4F]
          "
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}