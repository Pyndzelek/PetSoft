import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main>
      <H1 className="text-center text-black mb-4 -mt-3">Sign up</H1>

      <AuthForm />

      <p className="mt-6 text-sm text-zinc-500 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-bold text-zinc-700">
          Log in
        </Link>
      </p>
    </main>
  );
}
