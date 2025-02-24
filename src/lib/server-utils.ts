import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet } from "@prisma/client";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getUserIDByPetId(petId: Pet["id"]) {
  try {
    const userId = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
      select: {
        userId: true,
      },
    });
    return userId?.userId;
  } catch (error) {
    console.error("Error fetching userId:", error);
    return {
      message: "Failed to fetch owner ID",
    };
  }
}
