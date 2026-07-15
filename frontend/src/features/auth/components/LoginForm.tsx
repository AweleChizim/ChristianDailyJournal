import type { JSX } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../../../components/ui/TextInput";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";
import Divider from "../../../components/ui/Divider";
import GoogleButton from "../../../components/ui/GoogleButton";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/login.Schema";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

const navigate = useNavigate();

async function onSubmit(
  data: LoginFormData
): Promise<void> {
  try {
    const response = await login(data);

    localStorage.setItem(
      "access_token",
      response.access_token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    toast.success("Welcome back!");

    navigate("/dashboard");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data.detail ?? "Invalid email or password."
      );
    } else {
      toast.error("Something went wrong.");
    }
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <TextInput
        id="email"
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging In..." : "Log In"}
      </Button>

      <Divider />

      <GoogleButton />
    </form>
  );
}