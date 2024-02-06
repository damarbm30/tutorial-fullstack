import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";

export default function Register() {
  return (
    <section className="flex h-screen items-center justify-center bg-zinc-950">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Register Yourself</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <Link to="/login" className="ml-auto">
            Already have an account?
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
