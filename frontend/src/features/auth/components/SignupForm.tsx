import type { JSX } from "react";

import { signup } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../../../components/ui/TextInput";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";
import Divider from "../../../components/ui/Divider";
import GoogleButton from "../../../components/ui/GoogleButton";

import {
  signupSchema,
  type SignupFormData,
} from "../schemas/signup.schema";

export default function SignupForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();


async function onSubmit(data: SignupFormData): Promise<void> {
  try {
    await signup(data);

    toast.success("Account created successfully!");

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.detail ?? "Signup failed.");
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
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          id="firstName"
          label="First Name"
          placeholder="Enter your first name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <TextInput
          id="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

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

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create An Account"}
      </Button>

      <Divider />

      <GoogleButton />
    </form>
  );
}