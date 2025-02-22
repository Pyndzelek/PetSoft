"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="self-end">
      {pending
        ? "Submitting..."
        : actionType === "add"
        ? "Add pet"
        : "Save changes"}
    </Button>
  );
}
