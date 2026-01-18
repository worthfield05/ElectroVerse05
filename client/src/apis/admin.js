import axios from "axios";

export const getAdminProductList = async () => {
  const { data } = await axios.get("/api/v1/admin/products");
  return data;
};
export const createAdminProduct = async (productData) => {
  const { data } = await axios.post("/api/v1/admin/products", productData, {
    withCredentials: true,
  });
  return data;
};
export const updateAdminProduct = async ({ id, productData }) => {
  const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, {
    withCredentials: true,
  });
  return data;
};

export const deleteAdminProduct = async (id) => {
  const { data } = await axios.delete(`/api/v1/admin/product/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const getUserList = async () => {
  const { data } = await axios.get("/api/v1/auth/admin/users");
  return data;
};
export const getUserDetail = async (id) => {
  const { data } = await axios.get(`/api/v1/auth/admin/user/${id}`);
  return data;
};

export const updateUserRole = async ({ id, role }) => {
  const { data } = await axios.put(
    `/api/v1/auth/admin/user/${id}`,
    { role },
    { withCredentials: true },
  );
  return data;
};

export const deleteAdminUser = async (id) => {
  const { data } = await axios.delete(`/api/v1/auth/admin/user/${id}`, {
    withCredentials: true,
  });
  return data;
};
