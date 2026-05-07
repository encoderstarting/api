const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveTokens(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}
export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function getUser() {
    const user = localStorage.getItem(USER_KEY);
    if(!user) return null;
    return JSON.parse(user);
}
export function clearUser() {
    localStorage.removeItem(USER_KEY);
}
export function isAdmin() {
    const user = getUser();
    if(!user) return false;
    return user.role === "admin";
}
