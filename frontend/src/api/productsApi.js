import { apiRequest } from "./apiClient";

export function getProducts() {
  return apiRequest("/products").then((data) => {
    return data.data;
  });
}

export function getProduct(id) {
  return apiRequest(`/products/${id}`).then((data) => {
    return data.data;
  });
}