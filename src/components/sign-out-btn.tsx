"use client";

import { LogOut } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="mt-5"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await LogOut();
        });
      }}
    >
      {isPending ? "Logging out" : "Log out"}
    </Button>
  );
}
