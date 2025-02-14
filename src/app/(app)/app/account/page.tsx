import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import React from "react";

export default function AccountPage() {
  return (
    <main>
      <H1 className="mt-[72px] mb-[8px]">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center">
        <p>Logged in as:</p>
        <p>Adress email</p>
      </ContentBlock>
    </main>
  );
}
