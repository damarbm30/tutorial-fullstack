import { apiPrivate } from "@/api";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await apiPrivate.get("/api/refresh");
    setAuth((prev) => ({
      ...prev,
      token: response.data.data.accessToken,
    }));

    return response;
  };

  return refresh;
}
