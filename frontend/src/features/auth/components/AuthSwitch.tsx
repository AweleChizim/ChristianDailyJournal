import type { JSX } from "react";
import { Link } from "react-router-dom";

interface AuthSwitchProps {
  active: "login" | "signup";
}

export default function AuthSwitch({
  active,
}: AuthSwitchProps): JSX.Element {
  return (
    <div className="mb-6 flex justify-center">
      <div className="flex rounded-2xl bg-[#5E5A4F] p-1 shadow-lg">
        <Link
          to="/signup"
          className={`rounded-xl px-6 py-2 transition ${
            active === "signup"
              ? "bg-[#DDD3BD] text-black"
              : "text-white"
          }`}
        >
          Sign Up
        </Link>

        <Link
          to="/"
          className={`rounded-xl px-6 py-2 transition ${
            active === "login"
              ? "bg-[#DDD3BD] text-black"
              : "text-white"
          }`}
        >
          Log In
        </Link>
      </div>
    </div>
  );
}