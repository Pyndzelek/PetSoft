import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main>
      <H1 className="mb-4 -mt-3 text-black text-center">Sign up</H1>

      <AuthForm />

      <SignInPrompt />
    </main>
  );
}

function SignInPrompt() {
  return (
    <p className="mt-6 text-sm text-zinc-500 text-center">
      Already have an account?{" "}
      <Link href="/login" className="text-zinc-700 text-bold">
        Log in
      </Link>
    </p>
  );
}
