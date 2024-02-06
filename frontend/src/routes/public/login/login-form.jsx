import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { apiPrivate } from "@/api";

const loginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = async (req) => {
    const { data, status } = await apiPrivate.post("/api/users/login", req);
    const response = data.data;

    return { response, status };
  };

  const onSubmit = async (data) => {
    const { response, status } = await loginUser(data);
    const { accessToken } = response;
    const decoded = jwtDecode(accessToken);

    setAuth({ token: accessToken });

    if (status === 200)
      navigate(location.state?.from?.pathname || "/", { replace: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Input your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input your password"
                  type="password"
                  autoComplete="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
