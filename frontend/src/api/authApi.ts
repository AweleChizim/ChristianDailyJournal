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
import type { User } from "../types/auth";
import { jwtDecode } from "jwt-decode";

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

export async function googleLogin(
  credential: string
): Promise<LoginResponse> {
  const response = await api.post("/auth/google", {credential,});

  return response.data;

}

export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function removeToken() {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

export function isLoggedIn() {
  return !!getToken();
}

export function saveUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): User | null {
    const user = localStorage.getItem("user");
    if (!user) {
        return null;
    }
    return JSON.parse(user);
}

interface JwtPayload {
    exp: number;
}
let logoutTimer: number | undefined;

export function startSessionTimer(
    token: string,
    onExpire: () => void
) {

    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }

    const { exp } = jwtDecode<JwtPayload>(token);
    const delay = exp * 1000 - Date.now();

    logoutTimer = window.setTimeout(() => {
        removeToken();
        onExpire();
    }, Math.max(delay, 0));

}

export function restoreSession(
    onExpire: () => void
) {
    const token = getToken();

    if (!token) {
        return;
    }

    startSessionTimer(
        token,
        onExpire
    );

}

export async function deleteAccount(
    password: string
): Promise<void> {

    await api.delete("/auth/me", {
        data: {
            password,
        },
    });

}

export async function deleteGoogleAccount(
    credential: string,
): Promise<void> {

    await api.post(
        "/auth/google/delete",
        {
            credential,
        },
    );

}