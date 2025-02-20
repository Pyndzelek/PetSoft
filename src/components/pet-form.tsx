"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const pet = Object.fromEntries(formData.entries());

    const newPet = {
      name: pet.name as string,
      imageUrl:
        (pet.imageUrl as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      ownerName: pet.owner as string,
      age: parseInt(pet.age as string),
      notes: pet.notes as string,
    };

    handleAddPet(newPet);
    onFormSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="owner">Owner</Label>
          <Input id="owner" name="owner" type="text" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} required />
        </div>
      </div>

      <Button type="submit" className="self-end">
        {actionType === "add" ? "Add pet" : "Save changes"}
      </Button>
    </form>
  );
}
