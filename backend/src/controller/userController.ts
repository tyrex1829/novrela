import { Context } from "hono";
import { prisma } from "../db/index";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

export const signup = async (c: Context) => {
  const body = await c.req.json();

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (checkUser) {
      return c.status(403);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

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
  const body = await c.req.json();

  try {
    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!checkUser) {
      return c.json(
        {
          message: `user not found`,
        },
        404
      );
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      checkUser.password
    );

    if (!isPasswordValid) {
      return c.json({
        message: `Incorrect password`,
      });
    }

    const token = await sign(
      {
        id: checkUser.id,
        email: checkUser.email,
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
        message: `Can't sign in right now`,
      },
      500
    );
  }
};
