import { z } from "zod"
 
export const categoryAddSchema = z.object({
  name: z.string().min(2,"Category name must have more than 2 characters").max(50),
})

export const itemAddSchema = z.object({
    name: z.string().min(2,"Item name must have more than 2 characters").max(50),
    itemCode:z.string().min(2,"Item code must have more than 2 characters").max(50),
    category:z.string().min(2,"Category must have ").max(50),
    description:z.optional(z.string()),
  })