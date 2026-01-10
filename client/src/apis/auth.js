import { API } from "./api";
export default {
  login: (credentials) => API.post("/auth/login", credentials),
  register: (data) => API.post("/auth/register", data),
  logout: () => API.post("/auth/logout"),
  getProfile: () => API.get("/auth/profile"),
};
