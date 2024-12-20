import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
  firstName: z.string(),
  secondName: z.string(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
