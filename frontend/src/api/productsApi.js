import { API_BASE_URL } from "./config";
export function getProducts() {
    return fetch(`${API_BASE_URL}/products`).then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось получить товары");
      }
  
      return response.json();
    }).then((data) => {
      return data.data;
    });
  }
  export function getProduct(id) {
    return fetch(`${API_BASE_URL}/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить товар");
        }
  
        return response.json();
      })
      .then((data) => {
        return data.data;
      });
  }