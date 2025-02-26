import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetButton from "@/components/pet-button";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";
import React from "react";

export default async function DashboardPage() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_200px] gap-4 md:h-[600px]">
        <div className="row-start-1 row-span-1 col-start-1 col-span-1">
          <SearchForm />
        </div>

        <div className="relative">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 row-start-3 row-span-full md:col-start-2 col-start-1 col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
