import { API_BASE_URL } from "./config";

export function apiRequest(path, options = {}) {
  const token = localStorage.getItem("access_token");

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  }).then((response) => {
    if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || errorData.error || "Товара недостаточно");
        });
      }

    return response.json();
  });
}