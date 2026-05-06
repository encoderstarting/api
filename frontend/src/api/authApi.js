import { apiRequest } from "./apiClient";

export function login(email, password) {
  return apiRequest("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
export function logout() {
  return apiRequest("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
}

export function getMe() {
  return apiRequest("/me");
}