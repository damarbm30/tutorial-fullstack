import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const requestToken = async () => {
      try {
        await refresh();
      } catch (error) {
        setError(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.token && persist ? requestToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return !persist ? <Outlet /> : isLoading ? <p>Loading</p> : <Outlet />;
}
