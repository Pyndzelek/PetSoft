"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleSetSelectedPetId: (id: Pet["id"]) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          console.log("add payload", payload);
          return [
            ...state,
            {
              ...payload,
              id: Math.random().toString(),
            },
          ];
        case "edit":
          console.log("edit payload", payload);
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return {
                ...pet,
                ...payload.petData,
              };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions

  const handleAddPet = async (petData: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: petData });

    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: Pet["id"], petData: PetEssentials) => {
    setOptimisticPets({
      action: "edit",
      payload: { petData: petData, id: petId },
    });
    console.log("petData edit handler", petData);

    const error = await editPet(petId, petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: id });

    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }

    setSelectedPetId(null);
  };

  const handleSetSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleSetSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
