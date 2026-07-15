import type { JSX } from "react";

import AuthLayout from "../../components/layout/AuthLayout";
import AuthSwitch from "../../features/auth/components/AuthSwitch";
import SignupForm from "../../features/auth/components/SignupForm";

export default function Signup(): JSX.Element {
  return (
    <AuthLayout>
      <AuthSwitch active="signup" />

      <h1 className="mb-2 text-center text-4xl font-bold text-[#000000]">
        Create An Account
      </h1>

      <SignupForm />
    </AuthLayout>
  );
}