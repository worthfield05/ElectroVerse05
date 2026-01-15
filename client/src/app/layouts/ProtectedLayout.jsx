import Loading from "@/components/common/Loading";
import { useProfile } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedLayout = () => {
  const { isLoading, data: user } = useProfile();
  const location = useLocation();
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }
  return <Outlet />;
};

export default ProtectedLayout;
