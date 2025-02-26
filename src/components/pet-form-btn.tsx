import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="self-end">
      {actionType === "add" ? "Add pet" : "Save changes"}
    </Button>
  );
}
