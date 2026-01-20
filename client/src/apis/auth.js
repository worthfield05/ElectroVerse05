import axios from "axios";

export default {
  login: async (credentials) => {
    const { data } = await axios.post("/api/v1/auth/login", credentials);
    return data;
  },
  register: async (userData) => {
    const { data } = await axios.post("/api/v1/auth/register", userData);
    return data;
  },
  logout: async () => {
    const { data } = await axios.post("/api/v1/auth/logout");
    return data;
  },
  profile: async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/profile", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }
      throw error;
    }
  },
};
