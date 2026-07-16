import api from "../api/axios";

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const AuthService = {
  signup: async (data: SignupData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
};