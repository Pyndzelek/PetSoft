"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { auth, signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth, getUserIDByPetId } from "@/lib/server-utils";

// --- User actions ---

export async function SignUp(formData: unknown) {
  //check is formdata is formData type
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data" };
  }

  //convert the formData to a javascript object
  const formDataObject = Object.fromEntries(formData.entries());
  //validate the object using zod schema
  const validatedFormDataObject = authSchema.safeParse(formDataObject);
  if (!validatedFormDataObject.success) {
    return { message: "Invalid form data" };
  }
  //refactor the object and use the data
  const { email, password } = validatedFormDataObject.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export async function LogIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data" };
  }
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormDataObject = authSchema.safeParse(formDataObject);
  if (!validatedFormDataObject.success) {
    return { message: "Invalid form data" };
  }

  await signIn("credentials", formData);
}

export async function LogOut() {
  await signOut({ redirectTo: "/" });
}

// --- Pet actions ---

export async function addPet(pet: unknown) {
  const session = await checkAuth();

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
  const session = await checkAuth();

  // Validate the data with ZOD schemas
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  //authorization check
  const userId = await getUserIDByPetId(validatedPetId.data);
  if (!userId) {
    return {
      message: "Pet not found",
    };
  }
  if (userId !== session.user.id) {
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
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Invalid pet ID" };
  }

  //authorization check
  const userId = await getUserIDByPetId(validatedPetId.data);
  if (!userId) {
    return {
      message: "Pet not found",
    };
  }
  if (userId !== session.user.id) {
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
