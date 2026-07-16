import type { JSX } from "react";

import AuthLayout from "../components/layout/AuthLayout";
import AuthSwitch from "../features/auth/components/AuthSwitch";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login(): JSX.Element {
  return (
    <AuthLayout>
      <AuthSwitch active="login" />

      <h1 className="mb-2 text-center text-4xl font-bold text-[#000000]">
        Log In
      </h1>

      <LoginForm />
    </AuthLayout>
  );
}