export function getToken() {
  let token = sessionStorage.getItem("token");
  if (token) {
    return token;
  }
  return localStorage.getItem("token") || "";
}

export function setToken(token: string, persistent: boolean = false) {
  if (persistent) {
    localStorage.setItem("token", token);
    sessionStorage.removeItem("token");
  } else {
    sessionStorage.setItem("token", token);
    localStorage.removeItem("token");
  }
}

export function removeToken() {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
}
