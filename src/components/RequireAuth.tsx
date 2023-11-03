import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};
