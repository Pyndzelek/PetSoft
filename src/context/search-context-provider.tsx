"use client";

import { createContext, useState } from "react";

type PetSearchProviderProps = {
  children: React.ReactNode;
};

type TPetSearchContext = {
  searchQuery: string;
  handleChangeQuery: (newValue: string) => void;
};

export const SearchContext = createContext<TPetSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: PetSearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
