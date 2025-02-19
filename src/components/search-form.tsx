"use client";

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleChangeQuery } = useSearchContext();

  return (
    <form action="" className="w-full h-full">
      <input
        type="search"
        placeholder="Search pets"
        className="w-full h-full bg-white/20 rounded-md px-5  outline-none transition-none focus:bg-white/50 hover:bg-white/30 placeholder-white/50 text-black/50"
        value={searchQuery}
        onChange={(e) => handleChangeQuery(e.target.value)}
      />
    </form>
  );
}
