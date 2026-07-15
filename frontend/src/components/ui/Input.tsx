import { type JSX } from "react";

import { type InputProps } from "../../types/component.types";

export default function Input({
  label,
  error,
  ...props
}: InputProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="
          rounded-lg
          border
          border-gray-300
          p-3
          outline-none
          focus:border-slate-900
        "
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}