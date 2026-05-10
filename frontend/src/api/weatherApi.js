import { apiRequest } from "./apiClient";

export function getWeather(city) {
  return apiRequest(`/weather?city=${encodeURIComponent(city)}`);
}