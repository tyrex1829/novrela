import { Context } from "hono";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { getPrismaClient } from "../db";
import { comparePassword, hashPassword } from "../middleware/password";
import {
  signupInput,
  signinInput,
} from "@tyrex1829/novrela-common-app/dist/zod/user.js";

export const signup = async (c: Context) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (checkUser) {
      return c.status(403);
    }

    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPassword,
        firstName: body.firstName,
        secondName: body.secondName,
      },
    });

    return c.json(
      {
        message: `user created successfully`,
        user,
      },
      201
    );
  } catch (error) {
    return c.json(
      {
        message: `can't signup right now ${error}`,
      },
      500
    );
  }
};

export const signin = async (c: Context) => {
  const prisma = getPrismaClient(c);
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  try {
    if (!body.email || !body.password) {
      return c.json(
        {
          message: "Email and password are required",
        },
        400
      );
    }
    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!checkUser) {
      return c.json(
        {
          message: `user not found`,
          email: body.email,
        },
        404
      );
    }

    const isPasswordValid = await comparePassword(
      body.password,
      checkUser.password
    );

    if (!isPasswordValid) {
      return c.json(
        {
          message: `Incorrect password`,
        },
        401
      );
    }

    const token = await sign(
      {
        id: checkUser.id,
        email: checkUser.email,
        username: checkUser.username,
      },
      c.env.JWT_SECRET
    );

    return c.json(
      {
        message: `Successfully signed in.`,
        token,
      },
      201
    );
  } catch (error) {
    return c.json(
      {
        message: `Can't sign in right now: ${error}`,
      },
      500
    );
  }
};
