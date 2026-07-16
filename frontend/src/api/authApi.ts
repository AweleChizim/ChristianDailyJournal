import api from "./axios";

import type {
  LoginResponse,
  SignupResponse,
} from "../types/auth";

import type {
  SignupFormData,
} from "../features/auth/schemas/signup.schema";

import type {
  LoginFormData,
} from "../features/auth/schemas/login.schema";

export async function signup(
  data: SignupFormData
): Promise<SignupResponse> {
  const response = await api.post("/auth/signup", {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
  });

  return response.data;
}

export async function login(
  data: LoginFormData
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);

  return response.data;
}