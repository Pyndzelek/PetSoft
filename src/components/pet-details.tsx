"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import H1 from "./h1";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  if (!selectedPet) {
    return <EmptyView />;
  }

  return (
    <section className="flex flex-col h-full w-full">
      <TopBar imageUrl={selectedPet.imageUrl} name={selectedPet.name} />

      <MiddlePart ownerName={selectedPet.ownerName} age={selectedPet.age} />

      <PetNotes notes={selectedPet.notes} />
    </section>
  );
}

function EmptyView() {
  return (
    <div className="flex items-center justify-center h-full">
      <H1 className="text-light">No pet selected</H1>
    </div>
  );
}

function TopBar({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <div className="flex items-center h-[100px] bg-white border-b border-light px-8">
      <Image
        src={imageUrl}
        alt="selected pet image"
        width={75}
        height={75}
        className="rounded-full object-cover w-[75px] h-[75px]"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">{name}</h2>

      <div className="flex ml-auto gap-2">
        <PetButton actionType="edit">edit</PetButton>
        <PetButton actionType="checkout">checkout</PetButton>
      </div>
    </div>
  );
}

function MiddlePart({ ownerName, age }: { ownerName: string; age: number }) {
  return (
    <div className="flex flex-row justify-around mt-10 text-center">
      <div>
        <h3 className="text-[13px] text-zinc/700 font-medium up">Owner name</h3>
        <p className="mt-1 text-lg text-zinc/800">{ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] text-zinc/700 font-medium up">age</h3>
        <p className="mt-1 text-lg text-zinc/800">{age}</p>
      </div>
    </div>
  );
}

function PetNotes({ notes }: { notes: string }) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 mt-10 flex-1 border border-light">
      {notes}
    </section>
  );
}
