export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SignupResponse {
  message: string;
  user: User;
}