import {
  changePassword,
  editProfile,
  forgotPassword,
  resetPassword,
} from "@/apis/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useEditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/profile");
    },
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/profile");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Custom message");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password Reset Successful");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/login");
    },
  });
};
