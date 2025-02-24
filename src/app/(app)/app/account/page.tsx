import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import React from "react";
import SignOutBtn from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function AccountPage() {
  const session = await checkAuth();
  return (
    <main>
      <H1 className="mt-[72px] mb-[8px]">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center">
        <p>Logged in as:</p>
        <p>{session.user.email}</p>

        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
