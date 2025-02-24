"use client";

import { LogOut } from "@/actions/actions";
import { Button } from "./ui/button";

export default function SignOutBtn() {
  return (
    <Button className="mt-5" onClick={async () => await LogOut()}>
      Sign out
    </Button>
  );
}
