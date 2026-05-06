import { API_BASE_URL } from "./config";

export function apiRequest(path, options = {}) {
  return fetch(`${API_BASE_URL}${path}`, options).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка запроса");
    }

    return response.json();
  });
}