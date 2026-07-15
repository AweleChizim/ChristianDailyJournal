import type { JSX } from "react";

export default function Divider(): JSX.Element {
  return (
    <div className="my-3 flex items-center gap-4">
      <hr className="flex-1 border-[#DDD3BD]" />

      <span className="text-xl">Or</span>

      <hr className="flex-1 border-[#DDD3BD]" />
    </div>
  );
}