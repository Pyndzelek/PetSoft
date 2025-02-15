import { Pet } from "@/lib/types";
import Image from "next/image";
import React from "react";

type PetlistProps = {
  pets: Pet[];
};

export default function PetList({ pets }: PetlistProps) {
  return (
    <ul className="bg-white border-b border-black-[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full items-center px-5 cursor-pointer gap-3 text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
