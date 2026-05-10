import { apiRequest } from "./apiClient";

export function convertCurrency(amount) {
  return apiRequest(`/currency/convert?amount=${amount}`);
}