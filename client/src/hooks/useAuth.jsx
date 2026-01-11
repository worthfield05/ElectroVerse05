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
  return useMutation({
    mutationFn: auth.logout,
  });
};
export const useProfile = () => {
  return useQuery({ queryKey: ["me"], queryFn: auth.profile, retry: false });
};
