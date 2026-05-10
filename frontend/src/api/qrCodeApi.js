import { apiRequest } from "./apiClient";

export function getProductQrCode(productId) {
    return apiRequest(`/products/${productId}/qr-code`);
}