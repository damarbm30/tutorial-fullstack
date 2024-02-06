import { useEffect } from "react";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { apiPrivate } from "@/api";

export default function useAxiosIntercept() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // resend request with new access token
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiPrivate.interceptors.response.eject(responseIntercept);
      apiPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return apiPrivate;
}
