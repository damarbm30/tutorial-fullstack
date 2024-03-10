import { ApiResponse, User } from "@/interfaces";
import { api } from "./axios";
import { handleAxiosError } from "@/lib/utils";

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const { data, status } = await api.get<User[]>("users");

    return { data, status };
  } catch (error) {
    return handleAxiosError(error);
  }
};
