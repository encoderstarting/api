import { apiRequest } from "./apiClient";

export function createOrder(productId, quantity = 1) {
  return apiRequest("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });
}