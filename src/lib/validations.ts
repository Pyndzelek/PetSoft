import { z } from "zod";
import { DEFAULT_PET_IMAGE_URL } from "./constants";

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.string().trim().url().or(z.literal("")),
    age: z.number({ message: "age is required" }).int().positive().max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => {
    return {
      ...data,
      imageUrl: data.imageUrl || DEFAULT_PET_IMAGE_URL,
    };
  });

//this is the type/shape of the form data
export type TPetForm = z.infer<typeof petFormSchema>;
