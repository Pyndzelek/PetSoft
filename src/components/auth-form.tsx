"use client";

import { LogIn, SignUp } from "@/actions/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useActionState } from "react";

type AuthFormProps = {
  type: "signup" | "login";
};

export default function AuthForm({ type }: AuthFormProps) {
  //this is to get the loading state as well as errors
  const [signUpError, dispatchSignUp] = useActionState(SignUp, undefined);
  const [loginError, dispatchLogin] = useActionState(LogIn, undefined);

  return (
    <form
      action={type === "login" ? dispatchLogin : dispatchSignUp}
      className="flex flex-col"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" required />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && (
        <p className="text-red-500 mt-2">{signUpError.message}</p>
      )}
      {loginError && <p className="text-red-500 mt-2">{loginError.message}</p>}
    </form>
  );
}
