import { UserRole } from "@prisma/client";
import * as z from "zod";

export const settingsSchema = z.object({
  name: z.optional(z.string()),
  role: z.optional(z.nativeEnum(UserRole)),
});

export type settingsValues = z.infer<typeof settingsSchema>;

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  workMode: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
