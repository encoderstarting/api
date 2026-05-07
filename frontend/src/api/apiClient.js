import { API_BASE_URL } from "./config";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./authStorage";

function buildHeaders(options = {}) {
  const token = getAccessToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

function getErrorMessage(errorData) {
  if (errorData?.message) {
    return errorData.message;
  }

  if (errorData?.errors) {
    const firstError = Object.values(errorData.errors)[0];

    if (Array.isArray(firstError)) {
      return firstError[0];
    }
  }

  return "Произошла ошибка";
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    clearTokens();
    return false;
  }

  const data = await parseResponse(response);
  saveTokens(data.token);

  return true;
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options),
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: buildHeaders(options),
      });

      if (!retryResponse.ok) {
        const errorData = await parseResponse(retryResponse);
        throw new Error(getErrorMessage(errorData));
      }

      return parseResponse(retryResponse);
    }

    throw new Error("Нужно войти в аккаунт");
  }

  if (!response.ok) {
    const errorData = await parseResponse(response);
    throw new Error(getErrorMessage(errorData));
  }

  return parseResponse(response);
}