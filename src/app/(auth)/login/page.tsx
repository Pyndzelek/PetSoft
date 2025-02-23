import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function LogInPage() {
  return (
    <main>
      <H1 className="text-center text-black mb-4 -mt-3">Log in</H1>

      <AuthForm type="login" />

      <p className="mt-6 text-sm text-zinc-500 text-center">
        No account yet?{" "}
        <Link href="/signup" className="text-bold text-zinc-700">
          Sign up
        </Link>
      </p>
    </main>
  );
}
