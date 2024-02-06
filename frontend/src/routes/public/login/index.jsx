import { Link } from "react-router-dom";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import LoginForm from "./login-form";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const { persist, setPersist } = useAuth();

  const handlePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    if (persist) {
      localStorage.setItem("persist", true);
      sessionStorage.removeItem("persist");
    } else {
      sessionStorage.setItem("persist", true);
      localStorage.removeItem("persist");
    }
  }, [persist]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-950">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Login Page</CardTitle>
          <CardDescription>Input your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span className="ml-auto flex items-center gap-2">
            <Checkbox id="persist" checked={persist} onClick={handlePersist} />
            <label
              htmlFor="persist"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Trust this device?
            </label>
          </span>
          <Link to="/register" className="ml-auto">
            Don't have an account?
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
