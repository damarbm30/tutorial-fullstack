import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";
import useAxiosIntercept from "./useAxiosIntercept";

import { useState } from "react";

export default function useLogout() {
  const [error, setError] = useState(null);
  const { auth, setAuth } = useAuth();
  const apiPrivate = useAxiosIntercept();
  const navigate = useNavigate();

  const {
    user: { username },
  } = jwtDecode(auth.token);

  const logout = async () => {
    try {
      await apiPrivate.delete("/api/users/logout", {
        data: { username },
      });
      navigate("/login", { replace: true });
      setAuth({});
    } catch (error) {
      setError(error);
    }
  };

  return logout;
}
