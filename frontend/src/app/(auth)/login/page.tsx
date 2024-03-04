import Link from "next/link";
import LoginForm from "@/components/login/login-form";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Spana Portal
          </h1>
          <p className="text-muted-foreground text-sm">
            Login with your work email to access your portal
          </p>
        </div>
        <LoginForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          By clicking continue, you agree to the company
          <Link
            href="/terms"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <span>&nbsp;and&nbsp;</span>
          <Link
            href="/privacy"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
