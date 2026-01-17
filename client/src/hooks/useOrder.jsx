// hooks/useOrder.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, getMyOrder, orderDetail } from "@/apis/order.api";
import { toast } from "sonner";
import { clearCart } from "./useCart";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order placed successfully 🎉");
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data || "An error occurred");
    },
  });
};
export const useGetMyOrder = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrder,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetOrderDetail = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderDetail(id),
    staleTime: 1000 * 60 * 2,
  });
};
