import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

export default function Public() {
  const { auth } = useAuth();
  const location = useLocation();

  return !auth.token ? <Outlet /> : <Navigate to="/" replace />;
}
