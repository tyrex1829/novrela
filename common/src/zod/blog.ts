import z from "zod";

export const makeBlogPost = z.object({
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean(),
  authorId: z.string(),
});

export const updateBlogPost = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().min(10),
  published: z.boolean(),
  authorId: z.string(),
});

export type MakeBlog = z.infer<typeof makeBlogPost>;
export type UpdateBlog = z.infer<typeof updateBlogPost>;
