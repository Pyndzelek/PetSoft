"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  type: "login" | "signup";
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 mx-auto" disabled={pending}>
      {type === "signup" ? "Sign up" : "Log in"}
    </Button>
  );
}
