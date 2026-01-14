import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import auth from "../apis/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: auth.register,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });
};
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/login");
    },
  });
};
export const useProfile = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: auth.profile,
    retry: false,
    throwOnError: (error) => {
      return error.response?.status !== 401;
    },
  });
};
