import axios from "axios";
export const editProfile = async (userData) => {
  const { data } = await axios.put("/api/v1/auth/update-user", userData, {
    withCredentials: true,
  });
  return data;
};
export const changePassword = async (credential) => {
  const { data } = await axios.put("/api/v1/auth/update-password", credential, {
    withCredentials: true,
  });
  return data;
};
export const forgotPassword = async (credential) => {
  const { data } = await axios.post("/api/v1/auth/forgot-password", credential);
  return data;
};
export const resetPassword = async ({ credential, token }) => {
  const { data } = await axios.post(
    `/api/v1/auth/reset-password/${token}`,
    credential
  );
  return data;
};
