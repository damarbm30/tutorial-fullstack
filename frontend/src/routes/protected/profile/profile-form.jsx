import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
import useAxiosIntercept from "@/hooks/useAxiosIntercept";

const profileSchema = z
  .object({
    name: z.string().min(2),
    password: z.string().min(1, "Password can't be empty"),
    passwordConfirm: z.string().min(1, "Password confirmation can't be empty"),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirm;
    },
    {
      message: "Entered passwords must match!",
      path: ["passwordConfirm"],
    },
  );

export default function ProfileForm() {
  const apiPrivate = useAxiosIntercept();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const updateUser = async (req) => {
    const {
      data: { data },
      status,
    } = await apiPrivate.patch("/api/users/current", req);
    const response = data;

    return { response, status };
  };

  const onSubmit = async (data) => {
    const { passwordConfirm, ...registerData } = { ...data };
    const { response, status } = await updateUser(registerData);

    console.log(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Input your full name" {...field} />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input
                  placeholder="Retype your password"
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
