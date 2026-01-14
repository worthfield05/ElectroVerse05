import axios from "axios";

export const getProducts = async ({ keyword, page, category }) => {
  const { data } = await axios.get("/api/v1/products", {
    params: {
      keyword,
      page,
      category,
    },
  });
  return data;
};
