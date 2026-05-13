import { apiRequest } from "./apiClient";

export function getAnalytics(from, to) {
  const params = new URLSearchParams();

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }

  const query = params.toString();

  return apiRequest(`/analytics${query ? `?${query}` : ""}`);
}