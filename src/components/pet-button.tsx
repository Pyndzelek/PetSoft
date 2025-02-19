import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
};

export default function PetButton({ actionType, children }: PetButtonProps) {
  switch (actionType) {
    case "add":
      return (
        <Button size="icon">
          <PlusIcon className="w-10 h-10" />
        </Button>
      );
    case "edit":
      return <Button variant="secondary">{children}</Button>;
    case "checkout":
      return <Button variant="secondary">{children}</Button>;
  }
}
