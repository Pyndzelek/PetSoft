import React from "react";

export default function Stats({ currentGuests }: { currentGuests: number }) {
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{currentGuests.toString()}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}
