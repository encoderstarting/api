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
export function createProduct(product) {
  return apiRequest("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(product),
  });
}
export function updateProduct(id, product) {
  return apiRequest(`/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(product),
  });

}
export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
