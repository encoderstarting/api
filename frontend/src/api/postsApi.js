import { apiRequest } from "./apiClient";

export function getPosts() {
  return apiRequest("/posts").then((data) => {
    return data.data;
  });
}

export function getPost(id) {
  return apiRequest(`/posts/${id}`).then((data) => {
    return data.data;
  });
}

export function createPost(post) {
  return apiRequest("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  });
}
export function updatePost(id, post) {
  return apiRequest(`/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  });
}
export function deletePost(id) {
  return apiRequest(`/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}