import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  type: z.string().min(1, { message: "Title is required" }),
  author: z.string().optional(),
  nbrPages: z.coerce
    .number()
    .gt(0, { message: "Pages/Runtime is required" })
    .optional(),
  runTimeMinutes: z.coerce
    .number()
    .gt(0, { message: "Runtime is required" })
    .optional(),
  isBorrowable: z.boolean().optional(),
  borrower: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function validate(body: FormData) {
  return schema.safeParse(body);
}
