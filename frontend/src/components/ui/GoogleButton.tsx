import type { JSX } from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton(): JSX.Element {
  return (
    <button
      className="
      mx-auto
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-xl
      bg-[#DDD3BD]
      shadow
      transition
      hover:scale-105
    "
    >
      <FcGoogle size={34} />
    </button>
  );
}