import axios from "axios";

export const createOrder = async (orderData) => {
  const { data } = await axios.post("/api/v1/new/order", orderData, {
    withCredentials: true,
  });
  return data;
};
export const getMyOrder = async () => {
  const { data } = await axios.get("/api/v1/orders/user", {
    withCredentials: true,
  });
  return data;
};
export const orderDetail = async (id) => {
  const { data } = await axios.get(`/api/v1/order/${id}`, {
    withCredentials: true,
  });
  return data;
};
