import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import Navbar from "../layout/navbar";

export default function Protected() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    // save current path before redirected to login
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
