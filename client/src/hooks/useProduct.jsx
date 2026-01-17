import { getProductDetail, getProducts } from "@/apis/product.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = ({ keyword, page, category }) => {
  return useQuery({
    queryKey: ["products", keyword, page, category],
    queryFn: () => getProducts({ keyword, page, category }),
    keepPreviousDate: true,
    staleTime: 1000 * 60 * 2,
  });
};
export const useProductDetail = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
};
