"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { logInSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { auth, signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

// --- User actions ---

export async function SignUp(formData: FormData) {
  // const data = Object.fromEntries(formData.entries());

  // const validatedData = logInSchema.safeParse(data);
  // if (!validatedData.success) {
  //   return;
  // }
  // const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);

  // try {
  //   await prisma.user.create({
  //     data: {
  //       email: validatedData.data.email,
  //       hashedPassword,
  //     },
  //   });

  //   await signIn("credentials", validatedData.data);
  // } catch (error) {
  //   return;
  // }

  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export async function LogIn(authData: FormData) {
  const data = Object.fromEntries(authData.entries());

  await signIn("credentials", data);
}

export async function LogOut() {
  await signOut({ redirectTo: "/" });
}

// --- Pet actions ---

export async function addPet(pet: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Validate the pet object with ZOD schema
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: `Failed to add pet: ${error}`,
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000);

  //authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Validate the data with ZOD schemas
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  //authorization check
  const userId = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
    //we only want to get the user ID from database
    select: {
      userId: true,
    },
  });
  if (!userId) {
    return {
      message: "Pet not found",
    };
  }
  if (userId.userId !== session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(1000);

  //authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Invalid pet ID" };
  }

  //authorization check
  const userId = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
    //we only want to get the user ID from database
    select: {
      userId: true,
    },
  });
  if (!userId) {
    return {
      message: "Pet not found",
    };
  }
  if (userId.userId !== session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }

  revalidatePath("/app", "layout");
}
