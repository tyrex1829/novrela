import z from "zod";

export const makeBlogPost = z.object({
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean().optional(),
  authorId: z.string().optional(),
});

export const updateBlogPost = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean().optional(),
  authorId: z.string().optional(),
});

export type MakeBlog = z.infer<typeof makeBlogPost>;
export type UpdateBlog = z.infer<typeof updateBlogPost>;
