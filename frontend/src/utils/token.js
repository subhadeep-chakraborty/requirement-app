export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode JWT 
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

// Check expiry
export const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return true;

  return decoded.exp * 1000 < Date.now();
};