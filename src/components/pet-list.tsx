import Image from "next/image";
import React from "react";

export default function PetList() {
  return (
    <ul className="bg-white border-b border-black-[0.08]">
      <li>
        <button className="flex h-[70px] w-full items-center px-5 cursor-pointer gap-3 text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
          <Image
            src="https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
            alt="Pet`s image"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p>Benjamin</p>
        </button>
      </li>
    </ul>
  );
}
