import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutBtn from "@/components/sign-out-btn";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

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
