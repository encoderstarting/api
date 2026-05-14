import { apiRequest } from "./apiClient";
export function createOrder(items) {
  return apiRequest("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ items }),
  });
}

export function getOrders() {
  return apiRequest("/orders").then((data) => data.data);
}