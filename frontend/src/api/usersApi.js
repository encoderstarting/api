import { apiRequest } from "./apiClient";

export function updateUserRole(userId, role) {
  return apiRequest(`/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ role }),
  });
}