import {
  createAdminProduct,
  deleteAdminProduct,
  deleteAdminUser,
  getAdminProductList,
  getUserDetail,
  getUserList,
  updateAdminProduct,
  updateUserRole,
} from "@/apis/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAdminProductList = () => {
  return useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAdminProductList,
    staleTime: 1000 * 60 * 5,
  });
};
export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminProduct,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminProduct,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useGetUserList = () => {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: getUserList,
    staleTime: 1000 * 60 * 5,
  });
};
export const useUserDetail = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserDetail(id),
    staleTime: 1000 * 60 * 5,
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      toast.success(data.message || "updated");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete user");
    },
  });
};
