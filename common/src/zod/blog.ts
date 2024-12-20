import z from "zod";

export const makeBlog = z.object({
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean(),
  authorId: z.string(),
});

export const updateBlog = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean(),
  authorId: z.string(),
});

export type MakeBlog = z.infer<typeof makeBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
