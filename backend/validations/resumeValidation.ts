import { z } from "zod";

export const resumeSchema = z.object({
  title: z.string().optional(),
  resumeData: z.any().optional(),
});