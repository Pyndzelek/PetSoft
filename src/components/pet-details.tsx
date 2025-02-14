import Image from "next/image";
import React from "react";

export default function PetDetails() {
  return (
    <section className="flex flex-col h-full w-full">
      <TopBar />

      <MiddlePart />

      <PetNotes />
    </section>
  );
}

function TopBar() {
  return (
    <div className="flex items-center h-[100px] bg-white border-b border-black-[0.08] px-8">
      <Image
        src=""
        alt="selected pet image"
        width={75}
        height={75}
        className="rounded-full object-cover"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">Benjamin</h2>
    </div>
  );
}

function MiddlePart() {
  return (
    <div className="flex flex-row justify-around mt-10 text-center">
      <div>
        <h3 className="text-[13px] text-zinc/700 font-medium up">Owner name</h3>
        <p className="mt-1 text-lg text-zinc/800">Kamil Kamil</p>
      </div>

      <div>
        <h3 className="text-[13px] text-zinc/700 font-medium up">Age</h3>
        <p className="mt-1 text-lg text-zinc/800">2</p>
      </div>
    </div>
  );
}

function PetNotes() {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 mt-10 flex-1 border border-black-[0.08]">
      Pet's notes
    </section>
  );
}
